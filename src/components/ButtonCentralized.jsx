import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../utils/styles";

const ButtonCentralized = ({ disable, handle, text }) => {
  return (
    <View>
      <TouchableOpacity
        style={disable ? styles.buttonEnabled : styles.buttonDisabled}
        disabled={!disable}
        onPress={handle}
        keyBoardType="default"
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonCentralized;
