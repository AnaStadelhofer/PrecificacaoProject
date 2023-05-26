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

const itemRef = collection(db, "Recipes");

export default function RecipeAdd({ navigation }) {

  // useEffect(() => {
  //   if (auth.currentUser.uid == null) {
  //     navigation.navigate("LoginScreen");
  //   }
  // }, [auth.currentUser.uid]);

  const [nameRecipe, setNameRecipe] = useState("");
  const [income, setIncome] = useState("");
  const [typeProfit, setTypeProfit] = useState("");
  const [profitValue, setProfitValue] = useState("");


  const saveItemRecipe = (recipe) => {
    try {
      addDoc(itemRef, recipe)
        .then((docRef) => {
          console.log("Item criado: ", docRef.id);
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

  function handleAddRecipe() {

    const idDoUsuario = auth.currentUser.uid;

    const recipe = {
      nameRecipe: nameRecipe.trim(),
      income: income.trim(),
      typeProfit: typeProfit.trim(),
      profitValue: profitValue.trim(),
      userID: idDoUsuario,
    };
    console.log(recipe)
    saveItemRecipe(recipe);
    setNameRecipe("");
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView horizontal={false}>
          <TextInput
            placeholder="NOME"
            style={styles.input}
            textContentType="text"
            editable={true}
            onChangeText={setNameRecipe}
          />

          <TextInput
            style={styles.input}
            placeholder="Ingredientes"
            textContentType="text"
            editable={true}
            right={
              <TextInput.Icon
                icon="plus"
                onPress={() => navigation.navigate("IngredientAdd")}
              />
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Rendimento"
            textContentType="text"
            keyboardType="numeric"
            editable={true}
            onChangeText={setIncome}
          />

          <TextInput
            style={styles.input}
            placeholder="Custo de contas"
            textContentType="text"
            keyboardType="numeric"
            editable={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Custo total"
            textContentType="text"
            keyboardType="numeric"
            editable={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Custo por unidade"
            textContentType="text"
            keyboardType="numeric"
            editable={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Tipo de lucro"
            textContentType="text"
            editable={true}
            onChangeText={setTypeProfit}
          />

          <TextInput
            style={styles.input}
            placeholder="Valor lucro"
            textContentType="text"
            keyboardType="numeric"
            editable={true}
            onChangeText={setProfitValue}
          />

          <TextInput
            style={styles.input}
            placeholder="Preço final"
            textContentType="text"
            keyboardType="numeric"
            editable={false}
          />
        </ScrollView>
        <View style={styles.btnCenterBottom}>
          {/* <ButtonCentralized onPress={handleAddRecipe} text="Salvar" disable={true}/> */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddRecipe}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
