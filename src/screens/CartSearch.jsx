import { TextInput } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../utils/styles";
import { useState} from "react";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function CartSearch() {
  const [search, setSearch] = useState("");

  async function searchItem(){
    try{
        const itemRef = collection(db, "Cart");
        const cartQuery = query(itemRef, where('nameProduct', '>=', search))
        const querySnapshot = await getDocs(cartQuery)
        const item = querySnapshot.docs.map(doc => doc.data())
          
        console.log(item)

    } catch (error) {
        console.log(error)
    }
  }
  
  // useEffect(() => {
  //   searchItem()
  //   console.log("batata")
  // }, [search])

  return (
    <View>
      <TextInput
        placeholder="Adicionar item"
        mode="outline"
        onChangeText={setSearch}
        style={styles.inputAddItem}
        right={
          <TextInput.Icon
            // icon="search"
            size={20}
            containerColor="lightgreen"
            // onPress={handleAddItem}
          />
        }
      ></TextInput>
    </View>
  );
}
