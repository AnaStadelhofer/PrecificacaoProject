import { View, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useRef, useState } from "react";
import { TextInput, Text } from "react-native-paper";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { app } from "../config/firebase";
import { Animated, StyleSheet } from "react-native";
import { useEffect } from "react";
import { styles } from "../utils/styles";
import Button from "react-native-paper";
import CartList from "./CartList";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";

const recipesRef = collection(db, "Recipes");

export default function Recipes({ navigation }) {
  const [expanded, setExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;
  const [messageVisible, setMessageVisible] = useState(false);
  const [icon, setIcon] = useState("arrow-down");
  const [nameRecipe, setNameRecipe] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);

  if (auth.currentUser == null) {
    navigation.navigate("LoginScreen");
  }

  const handleItemPress = () => {
    Animated.timing(heightAnim, {
      toValue: expanded ? 0 : 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
    setIcon("arrow-up");
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const saveItemRecipe = (recipe) => {
    try {
      addDoc(recipesRef, recipe)
        .then((docRef) => {
          const recipeId = docRef.id;
          console.log("Item criado: ", docRef.id);
          toggleModal()
          navigation.navigate("RecipeAdd", { recipe, recipeId }); 
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
    try {
      const idDoUsuario = auth.currentUser.uid;

      const recipe = {
        nameRecipe: nameRecipe.trim(),
        userID: idDoUsuario,
      };
      console.log(recipe);
      saveItemRecipe(recipe);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      {messageVisible ? (
        <Text style={styles.emptyCart}>
          Ops! Parece que você não criou nenhuma receita ainda!
        </Text>
      ) : (
        <View style={styles.recipeContainer}>
          <TouchableOpacity style={styles.item} onPress={handleItemPress}>
            <Text style={styles.itemTextTitle}>
              <FontAwesome name={icon} style={styles.arrowicon} />
              Bolo de Pote
              <TouchableOpacity style={styles.iconsContainer} onPress={null}>
                <FontAwesome name="pencil" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconsContainer} onPress={null}>
                <FontAwesome name="trash" style={[styles.icon, { flex: 1 }]} />
              </TouchableOpacity>
            </Text>
          </TouchableOpacity>
          <Animated.View style={[styles.expandedItem, { height: heightAnim }]}>
            <Text style={styles.itemText}>Custo total: R$ 20,00</Text>
            <Text style={styles.itemText}>Preço final: R$ 25,00</Text>
          </Animated.View>
        </View>
      )}
      <TouchableOpacity style={styles.recipebutton} onPress={toggleModal}>
        <Icon name="plus" size={24} color="black" />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            maxHeight: "25%",
            borderRadius: 15,
          }}
        >
          <Text style={{fontSize: 20, textAlign: 'left'}}>Criar receita</Text>
          <TextInput
            placeholder="Nome da Receita"
            style={styles.inputModal}
            textContentType="text"
            editable={true}
            onChangeText={setNameRecipe}
          />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity style={styles.btnModal} onPress={toggleModal}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnModal} onPress={handleAddRecipe}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
