import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { app } from "../config/firebase";
import { useEffect, useState } from "react";
import { styles } from "../utils/styles";
import CartList from "./CartList";
import CartSearch from "./CartSearch";

const itemRef = collection(getFirestore(app), "Cart");

export default function CartScreen() {
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
    console.log(nameItem);
    const cart = { nameProduct: nameItem.trim(), checkProduct: false };
    saveItemCart(cart);
    setNameItem("");
    setCheckedItem(true);
  }

  return (
    <View style={styles.container}>
      {/* <CartSearch/> */}
      <CartList />
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
