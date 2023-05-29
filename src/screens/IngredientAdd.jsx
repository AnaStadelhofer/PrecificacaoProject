import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { styles } from "../utils/styles";
import { auth } from "../config/firebase";
import { collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { addDoc } from "firebase/firestore";

const itemRef = collection(db, "Ingredient");

export default function IngredientAdd({ navigation, route }) {
  const { recipe, recipeId } = route.params;
  const [ingredient, setIngredient] = useState("");
  const [price, setPrice] = useState("");
  const [totalPurchased, setTotalPurchased] = useState("");
  const [totalUsed, setTotalUsed] = useState("");

  console.log(recipeId + 'ID');

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
    const ingredients = {
      ingredient: ingredient.trim(),
      price: price.trim(),
      totalPurchased: totalPurchased.trim(),
      totalUsed: totalUsed.trim(),
      recipeId: recipeId.trim()
    };
    console.log(ingredients);
    saveItemIngredient(ingredients);
  }

  return (
    <View style={[styles.container, { justifyContent: "flex-start" }]}>
      <SafeAreaView>
        <View>
          <TextInput
            placeholder="Ingrediente *"
            secureTextEntry={false}
            textContentType="text"
            keyboardType="default"
            style={[styles.input, { marginTop: 30 }]}
            value={ingredient}
            onChangeText={setIngredient}
          />

          <TextInput
            placeholder="Preço do Ingrediente *"
            secureTextEntry={false}
            textContentType="text"
            keyboardType="numeric"
            style={styles.input}
            value={price}
            onChangeText={setPrice}
          />

          <TextInput
            placeholder="Total comprado *"
            secureTextEntry={false}
            textContentType="text"
            keyboardType="numeric"
            style={styles.input}
            value={totalPurchased}
            onChangeText={setTotalPurchased}
          />

          <TextInput
            placeholder="Total usado *"
            secureTextEntry={false}
            textContentType="text"
            keyboardType="numeric"
            style={styles.input}
            value={totalUsed}
            onChangeText={setTotalUsed}
          />
        </View>

        <View style={[styles.textLinks, { marginBottom: 30 }]}>
          <TouchableOpacity onPress={() => navigation.navigate("RecipeAdd")}>
            <Text style={styles.link}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.textInputContainer]}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddIngredients}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
