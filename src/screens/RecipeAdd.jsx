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

export default function RecipeAdd({ navigation, route }) {
  const { recipeId, recipe } = route.params;
  const [nameRecipe, setNameRecipe] = useState("");
  const [income, setIncome] = useState("");
  const [typeProfit, setTypeProfit] = useState("");
  const [profitValue, setProfitValue] = useState("");

  function handleEditRecipe() {
    try {
      const idDoUsuario = auth.currentUser.uid;

      const updatedRecipe = {
        nameRecipe: nameRecipe.trim(),
        income: income.trim(),
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

  return (
    <View style={[styles.container, { alignItems: "center" }]}>
      <SafeAreaView>
        <ScrollView horizontal={false}>
          <TextInput
            placeholder="Nome da receita"
            style={styles.input}
            textContentType="text"
            editable={true}
            value={recipe.nameRecipe}
            onChangeText={setNameRecipe}
            right={<TextInput.Icon icon="information" />}
          />

          <View style={styles.listIngredient}>
            <View style={styles.divIcon}>
              <View style={styles.divIconLeft}>
                <Text style={styles.textLeft}>Ingredientes</Text>
              </View>

              <View style={styles.divIconRight}>
                <TextInput.Icon
                  styles={{ textAlign: "right" }}
                  onPress={() =>
                    navigation.navigate("IngredientAdd", { recipe, recipeId })
                  }
                  icon="plus"
                />
              </View>

              <View style={styles.divIconRight}>
                <TextInput.Icon
                  styles={{ textAlign: "right" }}
                  icon="information"
                />
              </View>
            </View>

            <ScrollView horizontal={false}>
              <IngredientList recipeId={recipeId} />
            </ScrollView>
          </View>


          <TextInput
            style={styles.input}
            placeholder="Rendimento"
            textContentType="text"
            keyboardType="numeric"
            editable={true}
            onChangeText={setIncome}
            right={<TextInput.Icon icon="information" />}
          />

          <View style={styles.divInput}>
            <View style={styles.column}>
              <TextInput
                style={styles.inputDiv}
                placeholder="Custo de contas"
                textContentType="text"
                keyboardType="numeric"
                editable={false}
                right={<TextInput.Icon icon="information" />} // Alterei de icon para name
              />
            </View>

            <View style={styles.column}>
              <TextInput
                style={styles.inputDiv}
                placeholder="Custo total"
                textContentType="text"
                keyboardType="numeric"
                editable={false}
                right={<TextInput.Icon icon="information" />} // Alterei de icon para name
              />
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Custo por unidade"
            textContentType="text"
            keyboardType="numeric"
            editable={false}
            right={<TextInput.Icon icon="information" />}
          />

          <View style={styles.divInput}>
            <View style={styles.column}>
              <TextInput
                style={styles.inputDiv}
                placeholder="Tipo de lucro"
                textContentType="text"
                editable={true}
                onChangeText={setTypeProfit}
                right={<TextInput.Icon icon="information" />}
              />
            </View>
            <View style={styles.column}>
              <TextInput
                style={styles.inputDiv}
                placeholder="Valor lucro"
                textContentType="text"
                keyboardType="numeric"
                editable={true}
                onChangeText={setProfitValue}
                right={<TextInput.Icon icon="information" />}
              />
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Preço final"
            textContentType="text"
            keyboardType="numeric"
            editable={false}
            right={<TextInput.Icon icon="information" />}
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
