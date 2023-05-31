import { View } from "react-native-animatable";
import { ScrollView, FlatList } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import {
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../utils/styles";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";

const itemRef = collection(db, "Ingredient");

export default function IngredientList({ recipeId }) {
  const [ingredient, setIngredient] = useState([]);
  console.log(recipeId);

  function handleDeleteIngredient(id) {
    try {
      const docRef = doc(db, "Ingredient", id);
      deleteDoc(docRef)
        .then(() => console.log("Documento deletado com sucesso"))
        .catch((error) => console.log(error));
    } catch (error) {
      Alert.alert("Aviso", "Ocorreu um erro, tente novamente mais tarde.", [
        {
          text: "OK",
        },
      ]);
      console.log(error);
    }
  }

  function handleDeleteAlert(id) {
    Alert.alert("Aviso", "Você tem certeza que deseja deletar esse item?", [
      {
        text: "NÃO",
      },
      {
        text: "SIM",
        onPress: () => handleDeleteIngredient(id),
      },
    ]);
  }


  const renderItem = ({ item }) => (
    <View>
      <SafeAreaView>
        <List.Item
          title={item.ingredient}
          data={ingredient}
          onPress={() => console.log("Pressionado")}
          right={() => (
            <View style={{ flexDirection: "row", ...styles.icons }}>
              <TouchableOpacity
                style={{ paddingLeft: 10 }}
                onPress={() => console.log("Apertado o edit")}
              >
                <List.Icon icon="pencil" size={28} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ paddingLeft: 10 }}
                onPress={() => handleDeleteAlert(item.id)}
              >
                <List.Icon icon="delete" size={28} />
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );

  useEffect(() => {
    try {
      const queryInstance = query(itemRef, where("recipeId", "==", recipeId));
      const ingredientQuery = onSnapshot(queryInstance, (snapshot) => {
        const listIngredient = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (listIngredient.length === 0) {
          console.log("carinho vazio")
        } else {
          setIngredient(listIngredient);
          console.log(listIngredient)
        }
      });
      return () => ingredientQuery();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.ingredientList}>
      <ScrollView horizontal={false}>
        <FlatList
          data={ingredient}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </ScrollView>
    </View>
  );
}
