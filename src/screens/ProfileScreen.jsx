import { Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../utils/styles";
import { TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Bem-vindo (a), Ana!</Text>
      <Text>Informações do seu perfil.</Text>
      <View>
        <TextInput
          placeholder="Ana Carolina Stadelhofer"
          // secureTextEntry={showPassword}
          textContentType="text"
          // value={password}
          // onChangeText={setPassword}
          style={styles.input}
        />
        <TextInput
          placeholder="ana.stadelhofer@teste.com.br"
          // secureTextEntry={showPassword}
          textContentType="text"
          // value={password}
          // onChangeText={setPassword}
          style={styles.input}
        />
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.buttonProfile}
          >
            <Text style={styles.buttonProfile}>Editar perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.buttonProfile}
          >
            <Text style={styles.buttonProfile}>Editar senha</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          // onPress={() => login(mailUser, password)}
        >
          <Text>Deslogar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
