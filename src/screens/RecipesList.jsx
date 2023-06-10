import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, ScrollView, Alert } from "react-native";
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
import { TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';


const itemRef = collection(db, "Recipes");

export default function RecipesList() {
  const navigation = useNavigation();

  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recipeEmpty, setRecipeEmpty] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

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
          expanded: false, // Adiciona a propriedade 'expanded' a cada item inicialmente como falso
        }));
        console.log(auth.currentUser);
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

  const handleItemPress = (item) => {
    setRecipe((prevRecipes) =>
      prevRecipes.map((prevItem) => {
        if (prevItem.id === item.id) {
          return { ...prevItem, expanded: !prevItem.expanded };
        } else {
          return { ...prevItem, expanded: false };
        }
      })
    );
  };

  const renderItem = ({ item }) => (
    <View>
      <View style={[styles.cardRecipe]}>
        <List.Item
          title={item.nameRecipe}
          data={recipes}
          left={() => (
            <FontAwesome
              name={item.expanded ? "arrow-up" : "arrow-down"}
              size={20}
              style={styles.arrowicon}
            />
          )}
          onPress={() => handleItemPress(item)}
          right={() => (
            <View style={{ alignSelf: "stretch", flexDirection: "row" }}>
              <TouchableOpacity
                style={{ paddingLeft: 10 }}
                onPress={() => {
                  console.log("pressioado");
                  navigation.navigate("RecipeAdd", {
                    recipeId: item.id,
                    recipe: item,
                  });
                }}
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
      </View>
      {item.expanded && (
        <Animated.View style={styles.expandedItem}>
          <Text style={styles.itemText}>
            Preço total: R${" "}
            {isNaN(item.totalPrice / item.revenue) || item.revenue == 0 ? (
              <Text>0.00</Text>
            ) : (
              <Text>{(item.totalPrice / item.revenue).toFixed(2)}</Text>
            )}
          </Text>
          <Text style={styles.itemText}>
            Preço de venda: R${" "}
            {isNaN(item.unitCost) ? (
              <Text>0.00</Text>
            ) : (
              parseFloat(item.unitCost).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })
            )}
          </Text>
        </Animated.View>
      )}
    </View>
  );

  return (
    <View style={styles.containerInner}>
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
