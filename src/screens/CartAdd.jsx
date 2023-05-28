import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { app } from "../config/firebase";
import { useEffect, useState } from "react";
import { styles } from "../utils/styles";
import { Alert } from "react-native";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";

const itemRef = collection(db, "Cart");

export default function CartAdd({ navigation }) {
  const [nameItem, setNameItem] = useState("");
  const [checkedItem, setCheckedItem] = useState(false);

  if (auth.currentUser == null) {
    navigation.navigate("LoginScreen");
  }

  const saveItemCart = (cart) => {
    try {
      addDoc(itemRef, cart)
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
      Alert.alert("Aviso", "Ocorreu um erro, tente novamente mais tarde.", [
        {
          text: "OK",
        },
      ]);
      console.log(error);
    }
  };

  function handleAddItem() {
    try {
      const idDoUsuario = auth.currentUser.uid;

      const cart = {
        nameProduct: nameItem.trim(),
        checkProduct: false,
        userID: idDoUsuario,
      };
      saveItemCart(cart);
      setNameItem("");
      setCheckedItem(true);
      
    } catch (error) {
      Alert.alert("Aviso", "Ocorreu um erro, tente novamente mais tarde.", [
        {
          text: "OK",
        },
      ]);
      console.log(error);
    }
  }

  return (
    <View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Adicionar item"
          mode="outline"
          onChangeText={setNameItem}
          style={styles.inputAddItem}
          right={
            <TextInput.Icon
              icon="plus"
              size={20}
              containerColor="lightgreen"
              onPress={handleAddItem}
            />
          }
        />
      </View>
    </View>
  );
}
