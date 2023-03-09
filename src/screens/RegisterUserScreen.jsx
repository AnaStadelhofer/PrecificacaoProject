import { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  Dimensions,
} from "react-native";
import { useLayoutEffect } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import LoginScreen from "./LoginScreen";

const { width } = Dimensions.get("window");

export default function RegisterUserScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [mailUser, setMailUser] = useState("");

  const handleRegister = async () => {
    try {
      createUserWithEmailAndPassword(auth, mailUser, password).then(
        (userCredential) => {
          console.log("Usuário registrado com sucesso!");
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TextInput
          placeholder="Nome *"
          secureTextEntry={false}
          textContentType="text"
          value={nameUser}
          onChangeText={setNameUser}
          style={styles.input}
        />
        <TextInput
          placeholder="Email *"
          secureTextEntry={false}
          textContentType="emailAddress"
          value={mailUser}
          onChangeText={setMailUser}
          style={styles.input}
        />
        <TextInput
          placeholder="Senha *"
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirmar Senha *"
          secureTextEntry={true}
          textContentType="password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.link}>Já possuo conta!</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.75,
    height: 50,
    backgroundColor: "#2196f3",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 30,
    width: width * 0.75,
  },
  link: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#2196f3",
    textAlign: "center",
  },
});
