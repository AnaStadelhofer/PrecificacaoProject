import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { styles } from "../utils/styles";
import { auth } from "../config/firebase";
import { collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { addDoc } from "firebase/firestore";
import ButtonCentralized from "../components/ButtonCentralized";
import { TextInputMask } from "react-native-masked-text";

const itemRef = collection(db, "Ingredient");

export default function IngredientAdd({ navigation, route }) {
  const { recipe, recipeId } = route.params;
  const [ingredient, setIngredient] = useState("");
  const [price, setPrice] = useState("");
  const [totalPurchased, setTotalPurchased] = useState("");
  const [totalUsed, setTotalUsed] = useState("");
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [totalInvalid, setTotalInvalid] = useState(false);

  const [errorFields, setErrorFields] = useState({
    ingredient: false,
    price: false,
    totalPurchased: false,
    totalUsed: false,
  });

  const checkFields = () => {
    if (
      ingredient &&
      price &&
      totalPurchased &&
      totalUsed &&
      totalInvalid == false
    ) {
      setButtonEnabled(true);
      // console.log("COMPRADO " + typeof parseInt(totalPurchased.trim()))
      // console.log("USADO: " + typeof parseInt(totalUsed.trim()))
      // console.log("PREÇO USADO DO INGREDIENTE: " + (parseFloat(price) / (parseFloat(totalPurchased) - parseFloat(totalUsed))))
    } else {
      setButtonEnabled(false);
      // console.log("COMPRADO " + typeof totalPurchased)
      // console.log("USADO: " + typeof totalUsed)
      // console.log("PREÇO USADO DO INGREDIENTE: " + (parseFloat(price) / (parseFloat(totalPurchased) - parseFloat(totalUsed))))
    }
  };

  // function checkInput(data) {
  //   if (data.length < 1) {
  //     console.log("erro");
  //   }
  //   console.log(data);
  // }

  const checkFieldTotal = (totalPurchased, totalUsed) => {
    if (totalPurchased < totalUsed) {
      setTotalInvalid(true);
    } else {
      setTotalInvalid(false);
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
      totalPurchased: parseInt(totalPurchased.trim()),
      totalUsed: parseInt(totalUsed.trim()),
      recipeId: recipeId.trim(),
    };
    console.log(ingredients);
    saveItemIngredient(ingredients);
  }

  return (
    <View style={[styles.container, { justifyContent: "flex-start", alignItems: "center" }]}>
      <SafeAreaView>
        <ScrollView horizontal={false}>
          <View>
            <TextInput
              placeholder="Ingrediente *"
              secureTextEntry={false}
              textContentType="text"
              keyboardType="default"
              style={[styles.input, { marginTop: 30 }]}
              value={ingredient}
              onChangeText={(text) => {
                setIngredient(text);
                checkFields();
              }}
              error={errorFields.ingredient}
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
                if (text.length < 1) {
                  setErrorFields({
                    ...errorFields,
                    price: true,
                  });
                } else {
                  setErrorFields({
                    ...errorFields,
                    price: false,
                  });
                }

                setPrice(text);
                checkFields();
              }}
              error={errorFields.price}
            />

            <TextInput
              placeholder="Total comprado *"
              secureTextEntry={false}
              textContentType="text"
              keyboardType="numeric"
              style={styles.input}
              value={totalPurchased}
              onChangeText={(text) => {
                if (text.length < 1) {
                  setErrorFields({
                    ...errorFields,
                    totalPurchased: true,
                  });
                
                } else {
                  setErrorFields({
                    ...errorFields,
                    totalPurchased: false,
                  });
                }
                setTotalPurchased(text);
                checkFields();
                checkFieldTotal(text, totalUsed);
              }}
            />

            <TextInput
              placeholder="Total usado *"
              secureTextEntry={false}
              textContentType="text"
              keyboardType="numeric"
              style={totalInvalid ? styles.inputError : styles.input}
              value={totalUsed}
              onChangeText={(text) => {
                if (text.length < 1) {
                  setErrorFields({
                    ...errorFields,
                    totalUsed: true,
                  });
                } else {
                  setErrorFields({
                    ...errorFields,
                    totalUsed: false,
                  });
                  console.log("Estou dentro do programado");
                }
                setTotalUsed(text);
                checkFields();
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

        <View style={[styles.textInputContainerIngre]}>
          <ButtonCentralized
            text="Confirmar"
            handle={handleAddIngredients}
            disable={isButtonEnabled}
          />
        </View>

        <View style={[styles.textLinks, { marginBottom: "5%" }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
