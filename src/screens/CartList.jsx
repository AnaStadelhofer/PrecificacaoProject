import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { List } from "react-native-paper";
import {
  collection,
  getFirestore,
  deleteDoc,
  onSnapshot,
  doc,
  query,
} from "firebase/firestore";
import { app, db } from "../config/firebase";
import { styles } from "../utils/styles";

const itemRef = collection(db, "Cart");

export default function CartList() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryInstance = query(itemRef);
    const cartQuery = onSnapshot(queryInstance, (snapshot) => {
      console.log(snapshot);
      const listCart = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLoading(false);
      setCart(listCart);
    });
    return () => cartQuery();
  }, []);

  function handleDelete(id) {
    console.log("vou deletar mesmo>", id);
    const docRef = doc(getFirestore(app), "Cart", id);
    deleteDoc(docRef)
      .then(() => console.log("Documento deletado com sucesso"))
      .catch((error) => console.log(error));
  }

  function handleEdit(id) {
    const selectedItem = cart.find(item => item.id === id);
    console.log("batata" + id)
    Alert.alert(
      'Editar nome do produto',
      'Digite o novo nome:',
      (newName) => {
        if (newName) {
          // Realize a ação de atualização do nome do produto
          console.log(`Novo nome: ${newName}`);
          // Aqui você pode utilizar o Firebase Firestore para atualizar o nome do produto
        }
      },
      'plain-text',
      id.nameProduct
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.cart}>
      <List.Item
        title={item.nameProduct}
        data={cart}
        // description={item.nameProduct}
        left={(props) => <List.Icon {...props} icon="check" />}
        onPress={() => console.log("Pressionado")}
        right={() => (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ paddingLeft: 10 }}
              onPress={() => handleEdit(item.id)}
            >
              <List.Icon icon="pen" size={28} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingLeft: 10 }}
              onPress={() => handleDelete(item.id)}
            >
              <List.Icon icon="delete" size={28} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        )}
      </ScrollView>
    </View>
  );
}
