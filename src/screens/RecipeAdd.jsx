import React from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { styles } from "../utils/styles";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IngredientAdd from "./IngredientAdd";
import ButtonCentralized from "../components/ButtonCentralized";

export default function RecipeAdd({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView horizontal={false}>
          <TextInput
            placeholder="NOME"
            style={styles.input}
            textContentType="text"
            editable={true}
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
          />

          <TextInput
            style={styles.input}
            placeholder="Valor lucro"
            textContentType="text"
            keyboardType="numeric"
            editable={true}
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
          <ButtonCentralized text="Salvar" disable={true}></ButtonCentralized>
        </View>
      </SafeAreaView>
    </View>
  );
}
