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

const itemRef = collection(db, "Ingredient");

export default function IngredientList({ recipeId }) {
  const [ingredient, setIngredient] = useState([]);
  console.log(recipeId)

  const renderItem = ({ item }) => (
      <View>
        <SafeAreaView>
          <List.Item
            title={item.ingredient}
            data={ingredient}
            onPress={() => console.log("Pressionado")}
            />
        </SafeAreaView>
      </View>
    );

    useEffect(() => {
      try {
        const queryInstance = query(
          itemRef,
          where("recipeId", "==", recipeId)
        );
        const ingredientQuery = onSnapshot(queryInstance, (snapshot) => {
          console.log(snapshot);
          const listIngredient = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (listIngredient.length === 0) {
          } else {
            setIngredient(listIngredient);
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
