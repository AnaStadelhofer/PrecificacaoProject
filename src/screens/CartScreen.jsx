import { View } from "react-native";
import CartAdd from "./CartAdd";
import CartList from "./CartList";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { collection } from "firebase/firestore";
import { useEffect } from "react";
import { styles } from "../utils/styles";

const itemRef = collection(db, "Cart");

export default function CartScreen({ navigation }) {

  useEffect(() => {
    if (auth.currentUser == null) {
      navigation.navigate("LoginScreen");
    }
  }, [auth.currentUser]);


  return (
    <View style={styles.container}>
      <CartList />
      <CartAdd />
    </View>
  );
}
