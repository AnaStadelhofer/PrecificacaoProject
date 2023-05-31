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

  const checkFields = () => {
    if (ingredient && price && totalPurchased && totalUsed && totalInvalid == false) {
      setButtonEnabled(true);
      console.log("COMPRADO " + typeof parseInt(totalPurchased.trim()))
      console.log("USADO: " + typeof parseInt(totalUsed.trim()))
      console.log("PREÇO USADO DO INGREDIENTE: " + (parseFloat(price) / (parseFloat(totalPurchased) - parseFloat(totalUsed))))
    } else {
      setButtonEnabled(false);
      console.log("COMPRADO " + typeof totalPurchased)
      console.log("USADO: " + typeof totalUsed)
      console.log("PREÇO USADO DO INGREDIENTE: " + (parseFloat(price) / (parseFloat(totalPurchased) - parseFloat(totalUsed))))

    }
  };

  const checkFieldTotal = (totalPurchased, totalUsed) => {
    if(totalPurchased < totalUsed){
      setTotalInvalid(true)
    } else {
      setTotalInvalid(false)
    }
  }

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
    const cleanedPrice = price.trim().replace(/^R\$|\s/g, '');

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
    <View style={[styles.container, { justifyContent: "flex-start" }]}>
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
                  setPrice(text)
                  checkFields()
              }}
            />

            <TextInput
              placeholder="Total comprado *"
              secureTextEntry={false}
              textContentType="text"
              keyboardType="numeric"
              style={styles.input}
              value={totalPurchased}
              onChangeText={(text) => {
                if (text === "") {
                  setTotalPurchased("");
                  checkFields();
                  checkFieldTotal(0, parseInt(totalUsed));
                } else {
                  const intValue = parseInt(text);
                  if (!isNaN(intValue)) {
                    const regex = /^[0-9]+$/;
                    if (regex.test(text)) {
                      setTotalPurchased(text);
                      checkFields();
                      checkFieldTotal(parseInt(totalPurchased), intValue);
                    }
                  }
                }
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
                if (text === "") {
                  setTotalUsed("");
                  checkFields();
                  checkFieldTotal(parseInt(totalPurchased), 0);
                } else {
                  const intValue = parseInt(text);
                  if (!isNaN(intValue)) {
                    const regex = /^[0-9]+$/;
                    if (regex.test(text)) {
                      setTotalUsed(text);
                      checkFields();
                      checkFieldTotal(intValue, parseInt(totalUsed));
                    }
                  }
                }
              }}
            />
            {totalInvalid && (
          <Text style={styles.error}>O total usado não pode ser menor que o total comprado.</Text>
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
