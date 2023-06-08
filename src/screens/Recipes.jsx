import { View, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { TextInput, Text, Dialog, Button} from "react-native-paper";
import { collection, addDoc } from "firebase/firestore";
import { styles } from "../utils/styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import RecipesList from "./RecipesList";

const recipesRef = collection(db, "Recipes");

export default function Recipes({ navigation }) {
  const [nameRecipe, setNameRecipe] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);
  const [recipeEmpty, setRecipeEmpty] = useState("");
  //const [dialogVisible, setDialogVisible] = useState(false);

  if (auth.currentUser == null) {
    navigation.navigate("LoginScreen");
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const saveItemRecipe = (recipe) => {
    try {
      addDoc(recipesRef, recipe)
        .then((docRef) => {
          const recipeId = docRef.id;
          console.log("Item criado: ", docRef.id);
          toggleModal();
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

  const clearRecipeName = () => {
    setNameRecipe("");
  };
  

  function handleAddRecipe() {
    if (nameRecipe.trim() === "") {
      setRecipeEmpty("Campo obrigatorío.");
      return;
    }
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
    <View style={styles.recipeContainer}>
 
      <RecipesList />

      <TouchableOpacity style={styles.recipebutton} onPress={() => {toggleModal(); setNameRecipe('');}}>

        <Icon name="plus" size={24} color="black" />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View
          style={styles.modalBack}
        >
          <Text style={{ fontSize: 20, textAlign: "left" }}>Criar receita</Text>
          <TextInput
            placeholder="Nome da Receita"
            label="Nome da Receita"
            style={recipeEmpty ? styles.modalError : styles.inputModal}
            textContentType="text"
            value={nameRecipe}
            onChangeText={setNameRecipe}
          />
          {recipeEmpty && <Text style={styles.modalErrorText}>{recipeEmpty}</Text> }
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center"
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
      {/* <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <Dialog.Title>Atenção</Dialog.Title>
        <Dialog.Content>
          <Text>Por favor, preencha o nome da receita</Text>
        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Ok</Button>
        </Dialog.Actions>
      </Dialog> */}
    </View>
  );
}
