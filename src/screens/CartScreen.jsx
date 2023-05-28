import { View } from "react-native";
import CartAdd from "./CartAdd";
import CartList from "./CartList";

export default function CartScreen({ navigation }) {
  return (
    <View>
      <CartList />
      <CartAdd />
    </View>
  );
}
