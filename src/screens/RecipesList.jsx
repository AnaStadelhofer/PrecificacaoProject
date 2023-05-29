import React, { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { List, Text } from "react-native-paper";
import {
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { styles } from "../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";
import { Animated } from "react-native";



const itemRef = collection(db, "Recipes");

export default function RecipesList() {
  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recipeEmpty, setRecipeEmpty] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [icon, setIcon] = useState("arrow-down");
  const heightAnim = useRef(new Animated.Value(0)).current;


  const handleItemPress = () => {
    Animated.timing(heightAnim, {
      toValue: expanded ? 0 : 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
    setIcon("arrow-up");
  };

  useEffect(() => {
    try {
      const queryInstance = query(
        itemRef,
        where("userID", "==", auth.currentUser.uid)
      );
      const recipeQuery = onSnapshot(queryInstance, (snapshot) => {
        console.log(snapshot);
        const listRecipe = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        if (listRecipe.length === 0) {
          setRecipeEmpty(true);
        } else {
          setRecipe(listRecipe);
        }
      });
      return () => recipeQuery();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleDeleteAlert(id) {
    Alert.alert("Aviso", "Você tem certeza que deseja deletar esse item?", [
      {
        text: "NÃO",
      },
      {
        text: "SIM",
        onPress: () => handleDelete(id),
      },
    ]);
  }

  function handleDelete(id) {
    try {
      const docRef = doc(db, "Recipes", id);
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

  const renderItem = ({ item }) => (
    <View>
      <SafeAreaView>
      <List.Item
          title={item.nameRecipe}
          data={recipes}
          onPress={() => console.log("Pressionado")}
          right={() => (
            <View style={{ flexDirection: "row", ...styles.icons }}>
              <TouchableOpacity
                style={{ paddingLeft: 10 }}
                onPress={() => console.log("Apertado")}
              >
                <List.Icon icon="pencil" size={28} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ paddingLeft: 10 }}
                onPress={() => console.log("batata")}
              >
                <List.Icon icon="delete" size={28} />
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );

  return (
    <View style={styles.recipeContainer}>
      <SafeAreaView>
        <ScrollView horizontal={false}>
          {loading || recipeEmpty ? (
            <Text style={styles.emptyCart}>
              Ops! Parece que você não adicionou nenhum item na lista de
              compras!
            </Text>
          ) : (
            <FlatList
              data={recipes}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
