import { View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { styles } from "../utils/styles";
import TextInput from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IngredientAdd({ navigation }) {
  return (
    <View style={styles.container}>
      <TextInput></TextInput>
    </View>
  );
}
