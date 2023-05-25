import { Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../utils/styles";
import { TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.centerInfo, {justifyContent: 'flex-start'}]}>
        <Text style={styles.welcomeUser}>Bem-vindo (a), Ana!</Text>
        <Text style={styles.infoUser}>Informações do seu perfil.</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="Ana Carolina Stadelhofer"
          // secureTextEntry={showPassword}
          textContentType="text"
          // value={password}
          // onChangeText={setPassword}
          style={styles.input}
          editable={false}
        />
        <TextInput
          placeholder="ana.stadelhofer@teste.com.br"
          // secureTextEntry={showPassword}
          textContentType="text"
          // value={password}
          // onChangeText={setPassword}
          style={styles.input}
          editable={false}
        />
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.buttonProfileDiv}
          >
            <Text style={styles.buttonProfile}>Editar perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.buttonProfileDiv}
          >
            <Text style={styles.buttonProfile}>Editar senha</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          // onPress={() => login(mailUser, password)}
        >
          <Text style={styles.buttonText}>Deslogar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
