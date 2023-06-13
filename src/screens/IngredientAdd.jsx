import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { styles } from "../utils/styles";
import { auth } from "../config/firebase";
import { collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { addDoc } from "firebase/firestore";
import ButtonCentralized from "../components/ButtonCentralized";
import { TextInputMask } from "react-native-masked-text";
import { updateDoc, doc } from "firebase/firestore";

const itemRef = collection(db, "Ingredient");

export default function IngredientAdd({ navigation, route }) {
  const { recipeId, isEditing, ingredientData } = route.params;
  const [ingredient, setIngredient] = useState("");
  const [price, setPrice] = useState("");
  const [totalPurchased, setTotalPurchased] = useState(0);
  const [totalUsed, setTotalUsed] = useState(0);
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [totalInvalid, setTotalInvalid] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");

  console.log(isEditing);

  useEffect(() => {
    if (isEditing) {
      setIngredient(ingredientData.ingredient);
      setPrice(ingredientData.price);
      setTotalPurchased(ingredientData.totalPurchased);
      setTotalUsed(ingredientData.totalUsed);
    }
  }, [isEditing, ingredientData]);

  useEffect(() => {
    if (
      ingredient == "" ||
      price == "" ||
      price == "R$ 0,00" ||
      totalPurchased == 0 ||
      totalUsed == 0 ||
      totalInvalid == true
    ) {
      setButtonEnabled(false);
    } else {
      setButtonEnabled(true);
    }
  }, [ingredient, price, totalPurchased, totalUsed]);

  useEffect(() => {
    const cleanedPrice = price.trim().replace(/^R\$|\s/g, "");
    const updatedTotalPrice =
      (parseFloat(cleanedPrice) / Number(totalPurchased)) * Number(totalUsed);
    setTotalPrice(updatedTotalPrice);

    if (
      !isNaN(Number(totalUsed)) &&
      !isNaN(updatedTotalPrice) &&
      !isNaN(Number(totalPurchased))
    ) {
      const recalculatedPrice =
        (updatedTotalPrice / Number(totalPurchased)) * Number(totalUsed);
      setTotalPrice(recalculatedPrice);

      console.log(
        "Total Comprado: " +
          Number(totalPurchased) +
          " dividido por " +
          Number(totalUsed) +
          " total Usado resultado no preço total: " +
          recalculatedPrice
      );
    }
  }, [price, totalPurchased, totalUsed]);

  const checkFieldTotal = (totalPurchased, totalUsed) => {
    if (Number(totalPurchased) >= Number(totalUsed)) {
      setTotalInvalid(false);
      console.log(
        "Campo está valido pois total usado é menor que total comprado"
      );
    } else {
      setTotalInvalid(true);
      console.log("Campo está invalido pois total usado foi maior");
    }
  };

  const saveItemIngredient = (ingredients) => {
    try {
      addDoc(itemRef, ingredients)
        .then((docRef) => {
          console.log("Item criado: ", docRef.id);
          navigation.goBack();
        })
        .catch((error) => {
          console.error("Error ao salvar item: ", error);
        })
        .finally(() => {
          console.log("Registro finalizado");
        });
    } catch (error) {
      console.log(error);
    }
  };

  function handleAddIngredients() {
    const cleanedPrice = price.trim().replace(/^R\$|\s/g, "");
    const ingredients = {
      ingredient: ingredient.trim(),
      price: cleanedPrice,
      totalPurchased: totalPurchased,
      totalUsed: totalUsed,
      recipeId: recipeId.trim(),
      totalPrice: totalPrice,
    };
    console.log(ingredients);
    handleSaveIngredients(ingredients);
  }

  function saveEditIngredients(ingredients) {
    console.log("Botão de editar");
    const ingredientRef = doc(db, "Ingredient");

    try {
      updateDoc(ingredientRef, ingredients, ingredientData.id)
        .then(() => {
          console.log("Ingrediente atualizada com sucesso!");
          navigation.goBack(); // Volta para a tela anterior após a edição
        })
        .catch((error) => {
          console.error("Erro ao atualizar a receita: ", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleSaveIngredients(ingredients) {
    if (isEditing) {
      saveEditIngredients(ingredients);
    } else {
      saveItemIngredient(ingredients);
    }
  }

  return (
    <View
      style={[
        styles.container,
        { justifyContent: "flex-start", alignItems: "center" },
      ]}
    >
      <SafeAreaView>
        <ScrollView horizontal={false}>
          <View style={{ marginTop: "20%" }}>
            <TextInput
              placeholder="Ingrediente *"
              secureTextEntry={false}
              textContentType="text"
              keyboardType="default"
              style={[styles.input, { marginTop: 30 }]}
              value={ingredient}
              onChangeText={(text) => {
                setIngredient(text);
              }}
            />

            <TextInputMask
              type={"money"}
              options={{
                precision: 2,
                separator: ",",
                delimiter: ".",
                unit: "R$ ",
                suffixUnit: "",
              }}
              renderText={(formattedValue) => (
                <Text style={[styles.inputText, { marginLeft: 10 }]}>
                  {formattedValue}
                </Text>
              )}
              placeholder="Preço do Ingrediente *"
              secureTextEntry={false}
              textContentType="text"
              keyboardType="numeric"
              style={styles.input}
              value={price}
              onChangeText={(text) => {
                setPrice(text);
              }}
            />

            <TextInput
              placeholder="Total comprado *"
              secureTextEntry={false}
              textContentType="number"
              keyboardType="numeric"
              style={styles.input}
              value={totalPurchased}
              onChangeText={(text) => {
                setTotalPurchased(text);
                checkFieldTotal(text, totalUsed);
              }}
            />

            <TextInput
              placeholder="Total usado *"
              secureTextEntry={false}
              textContentType="number"
              keyboardType="numeric"
              style={totalInvalid ? styles.inputError : styles.input}
              value={totalUsed}
              onChangeText={(text) => {
                setTotalUsed(text);
                checkFieldTotal(totalPurchased, text);
              }}
            />

            {totalInvalid && (
              <Text style={styles.error}>
                O total usado não pode ser menor que o total comprado.
              </Text>
            )}
          </View>
        </ScrollView>
        {/* <View style={[styles.textLinks, { marginBottom: "5%" }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Voltar</Text>
          </TouchableOpacity>
        </View> */}
        <View style={[styles.textInputContainerIngre]}>
          <ButtonCentralized
            text="Confirmar"
            handle={handleAddIngredients}
            disable={isButtonEnabled}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
