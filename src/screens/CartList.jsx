import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView, Alert, TouchableOpacity } from "react-native";
import { List, Text } from "react-native-paper";
import {
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { styles } from "../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";

const itemRef = collection(db, "Cart");

export default function CartList() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartEmpty, setCartEmpty] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    try {
      const queryInstance = query(
        itemRef,
        where("userID", "==", auth.currentUser.uid)
      );
      const cartQuery = onSnapshot(queryInstance, (snapshot) => {
        console.log(snapshot);
        const listCart = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        if (listCart.length === 0) {
          setCartEmpty(true);
        } else {
          setCart(listCart);
          setCartEmpty(false);
        }
      });
      return () => cartQuery();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const toggleCheckbox = (itemId) => {
    try {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
        )
      );

      const docRef = doc(db, "Cart", itemId);
      const checkProduct = !cart.find((item) => item.id === itemId)
        ?.checkProduct;

      updateDoc(docRef, { checkProduct })
        .then(() => console.log("Checkbox atualizado no Firebase"))
        .catch((error) => console.log(error));
    } catch (error) {
      Alert.alert("Aviso", "Ocorreu um erro, tente novamente mais tarde.", [
        {
          text: "OK",
        },
      ]);
      console.log(error);
    }
  };

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
      const docRef = doc(db, "Cart", id);
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

  // function handleEdit(id) {
  //   const selectedItem = cart.find((item) => item.id === id);
  //   showModalEdit(true);
  // }

  // function hideModalEdit(id) {
  //   setDialogVisible(false);
  // }

  // const showModalEdit = (id) => {
  //   setDialogVisible(true);
  //   edit(id);
  // };

  // function edit(id) {
  //   console.log(showModalEdit);
  //   return <View></View>;
  // }

  const renderItem = ({ item }) => (
    <View style={item.checkProduct ? styles.cartEnable : styles.cart}>
      <SafeAreaView>
        <List.Item
          title={item.nameProduct}
          data={cart}
          left={(props) => (
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => toggleCheckbox(item.id)}>
                <View
                  style={[
                    styles.checkbox,
                    item.checkProduct
                      ? styles.checkboxSelected
                      : styles.isSelected,
                  ]}
                ></View>
              </TouchableOpacity>
            </View>
          )}
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
                onPress={() => handleDeleteAlert(item.id)}
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
    <View style={styles.containerInner}>
      <SafeAreaView>
        <ScrollView horizontal={false}>
          {loading || cartEmpty ? (
            <Text style={styles.emptyCart}>
              Ops! Parece que você não adicionou nenhum item na lista de
              compras!
            </Text>
          ) : (
            <FlatList
              data={cart}
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
