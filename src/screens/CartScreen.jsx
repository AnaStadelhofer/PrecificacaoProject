import { View } from "react-native";
import CartAdd from "./CartAdd";
import CartList from "./CartList";
import CartSearch from "./CartSearch";
import { auth, db } from "../config/firebase";
import { collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { styles } from "../utils/styles";


const itemRef = collection(db, "Cart");

export default function CartScreen({ navigation }) {

  useEffect(() => {
    if (auth.currentUser.uid == undefined) {
      navigation.navigate("LoginScreen");
    }
  }, [auth.currentUser.uid]);

  const [nameItem, setNameItem] = useState("");
  const [checkedItem, setCheckedItem] = useState(false);

  const saveItemCart = (cart) => {

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
  };

  function handleAddItem() {

    const idDoUsuario = auth.currentUser.uid;

    const cart = {
      nameProduct: nameItem.trim(),
      checkProduct: false,
      userID: idDoUsuario,
    };
    saveItemCart(cart);
    setNameItem("");
    setCheckedItem(true);
  }

  return (
    <View style={styles.containerCard}>
      <CartList />
      <CartAdd />
    </View>
  );
}
