import { ScrollView, View, ActivityIndicator, FlatList } from "react-native";
import { List } from "react-native-paper";
import {
  collection,
  getFirestore,
  deleteDoc,
  onSnapshot,
  doc,
  query,
} from "firebase/firestore";
import { app } from "../config/firebase";
import { useEffect, useState } from "react";
import { styles } from "../utils/styles";
import { TouchableOpacity } from "react-native-web";

const itemRef = collection(getFirestore(app), "Cart");

export default function CartList() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryInstance = query(itemRef);
    const cartQuery = onSnapshot(queryInstance, (snapshot) => {
      console.log(snapshot);
      const listCart = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
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

  const renderItem = ({ item }) => (
    <View>
      <List.Item
        title={item.nameProduct}
        data={cart}
        // description={item.nameProduct}
        left={(props) => <List.Icon {...props} icon="check" />}
        onPress={() => console.log("Pressionado")}
        right={(props) => (
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <List.Icon {...props} icon="delete" size={28} />
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </ScrollView>
    </View>
  );
}
