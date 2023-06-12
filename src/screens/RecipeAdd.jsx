import React from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { styles } from "../utils/styles";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../config/firebase";
import { collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect } from "react";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { TouchableOpacity } from "react-native";
import { updateDoc, doc } from "firebase/firestore";
import IngredientList from "./IngredientList";
import { Alert } from "react-native";
import { query, where, onSnapshot } from "firebase/firestore";
import Modal from "react-native-modal";
import { RadioButton } from "react-native-paper";

const itemRef = collection(db, "Ingredient");

export default function RecipeAdd({ navigation, route }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [typeEmpty, setTypeEmpty] = useState(" ");
  const [selectedOption, setSelectedOption] = useState(null);

  const { recipeId, recipe } = route.params;
  const [nameRecipe, setNameRecipe] = useState(recipe.nameRecipe);
  const [revenue, setRevenue] = useState(recipe.revenue || 1); // rendimento
  const [typeProfit, setTypeProfit] = useState(recipe.typeProfit || ""); //tipo de lucro
  const [message, setMessage] = useState("");
  const [profitValue, setProfitValue] = useState(recipe.profitValue || 0); //valor de lucro
  const [totalPrice, setTotalPrice] = useState(0); //total da receita mais adicional
  const [additional, setAdditional] = useState(10); //adiciona de 10%
  const [unitCost, setUnitCost] = useState(0); //custo por unidade com lucro
  const [salePrice, setSalePrice] = useState(0); //valor do total de venda sem unidade

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function handleEditType() {
    if (selectedOption === null) {
      setTypeEmpty("O campo é obrigatório");
      return;
    } else {
      setTypeEmpty(" ");
      setTypeProfit(selectedOption);
      toggleModal();
    }
  }

  useEffect(() => {
    try {
      const queryInstance = query(itemRef, where("recipeId", "==", recipeId));
      const ingredientQuery = onSnapshot(queryInstance, (snapshot) => {
        const listIngredient = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (listIngredient.length === 0) {
        } else {
          const totalPriceQuery = listIngredient.reduce(
            (accumulator, ingredient) =>
              accumulator + parseFloat(ingredient.totalPrice),
            0
          );
          console.log("Total Price: " + totalPriceQuery);
          calculatingCosts(totalPriceQuery);
        }
      });
      return () => ingredientQuery();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (typeProfit == "Porcentagem") {
      setSalePrice(totalPrice + totalPrice * (profitValue / 100));
    } else {
      setSalePrice(Number(profitValue) + Number(totalPrice));
    }
  }, [totalPrice, profitValue, typeProfit]);

  useEffect(() => {
    if (revenue == 0) {
      setUnitCost(salePrice);
    } else {
      setUnitCost(salePrice / revenue);
    }
  }, [revenue, salePrice]);

  const calculatingCosts = (totalPriceQuery) => {
    console.log("total do custo: " + totalPriceQuery * (additional / 100));
    setTotalPrice(totalPriceQuery + totalPriceQuery * (additional / 100));
  };

  function handleEditRecipe() {
    try {
      const idDoUsuario = auth.currentUser.uid;

      const updatedRecipe = {
        nameRecipe: nameRecipe,
        revenue: revenue,
        typeProfit: typeProfit.trim(),
        profitValue: profitValue,
        unitCost: unitCost,
        salePrice: salePrice,
        totalPrice: totalPrice,
        additional: additional,
        userID: idDoUsuario,
      };

      const recipeRef = doc(db, "Recipes", recipeId);

      updateDoc(recipeRef, updatedRecipe)
        .then(() => {
          console.log("Receita atualizada com sucesso!");
          navigation.goBack(); // Volta para a tela anterior após a edição
        })
        .catch((error) => {
          console.error("Erro ao atualizar a receita: ", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const openAlertInfo = (message) => {
    Alert.alert("Info", message, [
      {
        text: "OK",
      },
    ]);
  };

  return (
    <View style={[styles.container, { alignItems: "center" }]}>
      <SafeAreaView>
        <ScrollView horizontal={false}>
          <TextInput
            label="Nome da Receita"
            placeholder="Nome da receita"
            style={styles.input}
            textContentType="text"
            editable={true}
            value={nameRecipe}
            onChangeText={setNameRecipe}
            right={
              <TextInput.Icon
                onPress={() =>
                  openAlertInfo(
                    "Neste campo deverá ser informado o nome da receita que deseja cadastrar."
                  )
                }
                icon="information"
              />
            }
          />

          <View style={styles.listIngredient}>
            <View style={{ marginBottom: 20 }}>
              <View style={styles.divIcon}>
                <View style={styles.divIconLeft}>
                  <Text style={styles.textLeft}>Ingredientes</Text>
                </View>

                <View style={styles.divIconRight}>
                  <TextInput.Icon
                    styles={{ textAlign: "right" }}
                    onPress={() =>
                      navigation.navigate("IngredientAdd", {
                        recipeId,
                        isEditing: false,
                        ingredientData: null,
                      })
                    }
                    icon="plus"
                  />
                </View>

                <View style={styles.divIconRight}>
                  <TextInput.Icon
                    styles={{ textAlign: "right" }}
                    icon="information"
                    onPress={() =>
                      openAlertInfo(
                        "Neste campo deverá ser cadastrado todos ingredientes que serão utilizada na receita."
                      )
                    }
                  />
                </View>
              </View>
            </View>
            <ScrollView horizontal={false} nestedScrollEnabled={true}>
              <IngredientList recipeId={recipeId} />
            </ScrollView>
          </View>

          <TextInput
            style={styles.input}
            label="Rendimento"
            // placeholder="Rendimento"
            textContentType="number"
            keyboardType="numeric"
            editable={true}
            onChangeText={(value) => {
              setRevenue(value);
              // calculationCost(value, typeProfit, profitValue);
              // console.log("Número de rendimento: " + value)
            }}
            value={revenue}
            right={
              <TextInput.Icon
                onPress={() =>
                  openAlertInfo(
                    "Neste campo deverá ser informado a quantidade que a receita rende, exemplo: uma receita de cupcake rende 20 unidades."
                  )
                }
                icon="information"
              />
            }
          />

          <View style={styles.divInput}>
            <View style={styles.column}>
              <TextInput
                label="Custo adicional"
                style={styles.inputDiv}
                placeholder="Custo adicional"
                textContentType="text"
                keyboardType="numeric"
                editable={false}
                value={additional.toString() + " %"}
                right={
                  <TextInput.Icon
                    onPress={() =>
                      openAlertInfo(
                        "Neste campo irá ter a porcentagem de custos que vai ser aplicado em cima da receita, sendo eles: conta de água, luz, gás, taxa do MEI e entre outros."
                      )
                    }
                    icon="information"
                  />
                } // Alterei de icon para name
              />
            </View>

            <View style={styles.column}>
              <TextInput
                label="Custo total"
                style={styles.inputDiv}
                placeholder="Custo total"
                textContentType="text"
                keyboardType="numeric"
                editable={false}
                value={"R$ " + totalPrice.toFixed(2)}
                right={
                  <TextInput.Icon
                    onPress={() =>
                      openAlertInfo(
                        "Neste campo será feito um calculo de todo o custo da receita, sem conta o lucro obtido pelo usuário."
                      )
                    }
                    icon="information"
                  />
                }
              />
            </View>
          </View>

          <View style={styles.divInput}>
            <View style={styles.column}>
              <TouchableOpacity onPress={toggleModal}>
                <TextInput
                  label="Tipo do lucro"
                  style={styles.inputDiv}
                  placeholder="Tipo de lucro"
                  textContentType="text"
                  editable={false}
                  value={typeProfit}
                  onChangeText={(value) => {
                    setTypeProfit(value);
                    // // console.log("Tipo de lucro: " + value)
                    // calculationCost(revenue, value, profitValue);
                  }}
                  right={
                    <TextInput.Icon
                      onPress={() =>
                        openAlertInfo(
                          "Neste campo deverá ser informado o nome da receita que deseja cadastrar."
                        )
                      }
                      icon="information"
                    />
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={styles.column}>
              <TextInput
                label="Lucro"
                style={styles.inputDiv}
                placeholder="Lucro"
                textContentType="text"
                keyboardType="numeric"
                editable={true}
                value={profitValue.toString()}
                onChangeText={(value) => {
                  setProfitValue(value);
                  // console.log("Valor do Lucro: " + value)
                  // calculationCost(revenue, typeProfit, value);
                }}
                right={<TextInput.Icon icon="information" />}
              />
            </View>
          </View>

          <TextInput
            style={styles.input}
            label="Preço total de venda"
            placeholder="Preço total de venda"
            textContentType="text"
            keyboardType="numeric"
            value={"R$ " + salePrice.toFixed(2)}
            editable={false}
            right={<TextInput.Icon icon="information" />}
          />

          <TextInput
            style={styles.input}
            label="Custo de venda por unidade"
            placeholder="Custo de venda por unidade"
            textContentType="text"
            keyboardType="numeric"
            editable={false}
            value={"R$ " + unitCost.toFixed(2)}
            right={
              <TextInput.Icon
                onPress={() =>
                  openAlertInfo(
                    "Neste campo vai ser calculado o custo da receita para cada unidade."
                  )
                }
                icon="information"
              />
            }
          />
          <View style={[styles.textLinks, { marginBottom: "5%" }]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.btnCenterBottom}>
          <TouchableOpacity style={styles.button} onPress={handleEditRecipe}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalBack}>
            <Text style={{ fontSize: 20, textAlign: "left" }}>
              Selecionar tipo de lucro
            </Text>
            <View style={styles.radioBtn}>
              <View style={styles.radioView}>
                <RadioButton
                  value="valorFixo"
                  status={
                    selectedOption === "Valor fixo" ? "checked" : "unchecked"
                  }
                  onPress={() => setSelectedOption("Valor fixo")}
                />
                <Text styles={styles.radioText}>Valor fixo</Text>
              </View>
              <View style={styles.radioView}>
                <RadioButton
                  value="porcentagem"
                  status={
                    selectedOption === "Porcentagem" ? "checked" : "unchecked"
                  }
                  onPress={() => setSelectedOption("Porcentagem")}
                />
                <Text styles={styles.radioText}>Porcentagem</Text>
              </View>
            </View>
            {typeEmpty && (
              <Text style={styles.modalErrorText}>{typeEmpty}</Text>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity style={styles.btnModal} onPress={toggleModal}>
                <Text style={styles.buttonTextModal}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnModal}
                onPress={handleEditType}
              >
                <Text style={styles.buttonTextModal}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}
