import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { List } from "react-native-paper";
import { Text, TextInput } from "react-native-paper";
import { TouchableHighlight } from "react-native";
import { Alert } from "react-native";
import {
  collection,
  getFirestore,
  deleteDoc,
  onSnapshot,
  doc,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { styles } from "../utils/styles";
import { updateDoc } from "firebase/firestore";
import { Button, Dialog } from "react-native-paper"; // Corrigido aqui
import { auth } from "../config/firebase";
import { where } from "firebase/firestore";

const itemRef = collection(db, "Cart");

export default function CartList() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartEmpty, setCartEmpty] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [nameItem, setNameItem] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
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
  }, []);

  const toggleCheckbox = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
      )
    );

    const docRef = doc(db, "Cart", itemId);
    const checkProduct = !cart.find((item) => item.id === itemId)?.checkProduct;

    updateDoc(docRef, { checkProduct })
      .then(() => console.log("Checkbox atualizado no Firebase"))
      .catch((error) => console.log(error));
  };

  function handleDeleteAlert(id) {
    Alert.alert("Aviso", "Você tem certeza que deseja deletar esse item?", [
      {
        text: "NÃO",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "SIM",
        onPress: () => handleDelete(id),
      },
    ]);
  }

  function handleDelete(id) {
    const docRef = doc(db, "Cart", id);
    deleteDoc(docRef)
      .then(() => console.log("Documento deletado com sucesso"))
      .catch((error) => console.log(error));
  }

  function handleEdit(id) {
    const selectedItem = cart.find((item) => item.id === id);
    console.log("batata");
    showModalEdit(true);
  }

  function hideModalEdit(id) {
    setDialogVisible(false);
  }

  const showModalEdit = (id) => {
    setDialogVisible(true);
    edit(id);
  };

  function edit(id) {
    console.log(showModalEdit);
    return <View></View>;
  }

  function handleAddCart() {
    if (nameRecipe.trim() === "") {
      setCartEmpty("Campo obrigatorío.");
      return;
    }
  }

  const renderItem = ({ item }) => (
    <View style={item.checkProduct ? styles.cartEnable : styles.cart}>
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
              onPress={() => toggleModal(item.id)}
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
    </View>
  );

  return (
    <View style={styles.containerInner}>
      <ScrollView horizontal={false}>
        {loading || cartEmpty ? (
          <Text style={styles.emptyCart}>
            Ops! Parece que você não adicionou nenhum item na lista de compras!
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
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalBack}>
          <Text style={{ fontSize: 20, textAlign: "left" }}>Editar item do carrinho</Text>
          <TextInput
            placeholder="Nome do Item"
            label="Nome do Item"
            style={cartEmpty ? styles.modalError : styles.inputModal}
            textContentType="text"
            value={nameItem}
            onChangeText={setNameItem}
          />
          {cartEmpty && (
            <Text style={styles.modalErrorText}>{cartEmpty}</Text>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity style={styles.btnModal} onPress={toggleModal}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnModal} onPress={null}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
