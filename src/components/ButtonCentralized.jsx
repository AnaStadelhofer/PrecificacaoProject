import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../utils/styles";

const ButtonCentralized = ({ disable, handle }) => {
  return (
    <View>
      <TouchableOpacity
        style={disable ? styles.buttonEnabled : styles.buttonDisabled}
        disabled={!disable}
        onPress={handle}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonCentralized;
