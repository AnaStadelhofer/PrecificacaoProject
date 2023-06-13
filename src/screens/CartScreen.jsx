import { View } from "react-native";
import CartAdd from "./CartAdd";
import CartList from "./CartList";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styles } from "../utils/styles";
import { onAuthStateChanged } from "firebase/auth";

const itemRef = collection(db, "Cart");

export default function CartScreen({ navigation }) {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuthenticated(true);
      } else {
        setUserAuthenticated(false);
        navigation.navigate("LoginScreen");
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userAuthenticated) {
    return null;
  }

  return (
    <View style={styles.containerCart}>
      <CartList />
      <CartAdd />
    </View>
  );
}