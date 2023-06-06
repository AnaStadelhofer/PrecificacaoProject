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
import { TextInputMask } from "react-native-masked-text";

// import Picker from "@ouroboros/react-native-picker";

const itemRef = collection(db, "Ingredient");

export default function RecipeAdd({ navigation, route }) {
  const { recipeId, recipe } = route.params;
  const [nameRecipe, setNameRecipe] = useState("");
  const [revenue, setRevenue] = useState(0);
  const [typeProfit, setTypeProfit] = useState("");
  const [message, setMessage] = useState("");
  const [profitValue, setProfitValue] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [additional, setAdditional] = useState(10);
  const [unitCost, setUnitCost] = useState(0);
  const [salePrice, setSalePrice] = useState(0);

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

  const calculatingCosts = (totalPriceQuery) => {
    console.log("total do custo: " + totalPriceQuery * (additional / 100));
    setTotalPrice(totalPriceQuery + totalPriceQuery * (additional / 100));
  };

  const calculationCost = (revenue, typeProfit, profitValue) => {
    console.log("Rendimento: " + revenue);
    console.log("Tipo de Lucro: " + typeProfit);
    console.log("Valor do Lucro: " + profitValue);



    // Calular custo total
    // Soma do Ingrediente + taxa do custo adiciona
    // Feito no calculatingCosts

    

    // Calcular preço total de venda
    // totalprice + profitvalue 


    if (typeProfit == "%") {
      console.log("Tipo escolhido é porcentagem");
      console.log("total de venda: " + (totalPrice + totalPrice * (profitValue / 100)));
      setSalePrice(totalPrice + totalPrice * (profitValue / 100))

    } else {
      console.log("Tipo escolhido é valor fixo");
      console.log('Total da venda: ' + (Number(profitValue) + Number(totalPrice)));
      setSalePrice(Number(profitValue) + Number(totalPrice))
    }

    // Calcular preço de venda por unidade
    //total de venda / por revenue


    if (revenue == 0 || revenue == 1) {
      console.log("Quantidade de rendimento é 0")
      setUnitCost(salePrice)
    } else {
      console.log("Preço por unidade" + (salePrice / revenue))
      setUnitCost(salePrice / revenue)

    }



    // console.log(
    //   "Quantidade que rende " + revenue + " e o custo total é " + totalPrice
    // );
    // if (revenue == 0) {
    //   setUnitCost(totalPrice);
    //   console.log("custo por unidade é " + unitCost);
    // } else {
    //   setUnitCost(totalPrice / revenue);
    //   console.log("custo por unidade é " + unitCost);
    // }

    // if (typeProfit == "%") {
    //   console.log("Tipo escolhido é porcentagem");
    // } else {
    //   console.log("Tipo escolhido é valor fixo");
    //   setSalePrice(parseInt(totalPrice) + parseInt(profitValue));
    //   console.log(salePrice);
    // }
  };

  function handleEditRecipe() {
    try {
      const idDoUsuario = auth.currentUser.uid;

      const updatedRecipe = {
        nameRecipe: nameRecipe.trim(),
        revenue: revenue.trim(),
        typeProfit: typeProfit.trim(),
        profitValue: profitValue.trim(),
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
            value={recipe.nameRecipe}
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
              calculationCost(value, typeProfit, profitValue);
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
                value={"R$ " + totalPrice.toString()}
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
              <TextInput
                label="Tipo do lucro"
                style={styles.inputDiv}
                placeholder="Tipo de lucro"
                textContentType="text"
                editable={true}
                value={typeProfit}
                onChangeText={(value) => {
                  setTypeProfit(value);
                  // console.log("Tipo de lucro: " + value)
                  calculationCost(revenue, value, profitValue);
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
                  calculationCost(revenue, typeProfit, value);
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
            value={"R$ " + salePrice.toString()}
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
            value={"R$ " + unitCost.toString()}
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
      </SafeAreaView>
    </View>
  );
}
