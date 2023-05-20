import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { styles } from "../utils/styles";

import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../components/Logo";

import { Alert } from "react-native";
import Divider from "../components/Divider";

export default function LoginScreen({ navigation }) {
  const [mailUser, setMailUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in: ", user);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        // setErrorMessage("Este usuário não existe. Por favor, verifique o e-mail.");
        Alert.alert("Erro", "Este usuário não existe. Por favor, verifique o e-mail.");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Erro", "E-mail ou Senha incorreta. Por favor, tente novamente.");
        // setErrorMessage("E-mail ou Senha incorreta. Por favor, tente novamente.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Erro", "Endereço de e-mail inválido. Por favor, verifique e tente novamente.");
        // setErrorMessage("Endereço de e-mail inválido. Por favor, verifique e tente novamente.");
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao fazer login. Por favor, tente novamente.");
        // setErrorMessage("Ocorreu um erro ao fazer login. Por favor, tente novamente.");
      }
      console.log("Error logging in: ", error);   
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <SafeAreaView>
      <View>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          secureTextEntry={false}
          textContentType="emailAddress"
          value={mailUser}
          onChangeText={setMailUser}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={showPassword}
          textContentType="password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye" : "eye-off"}
              size={20}
              style={{ marginRight: 10 }}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        >
        </TextInput>

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => login(mailUser, password)}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
        <Divider />
        <View style={styles.textLinks}>
          <TouchableOpacity onPress={() => navigation.navigate("FPasswordScreen")}>
            <Text style={styles.link}>Esqueci minha senha!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterUserScreen")}
          >
            <Text style={styles.link}>Não possuo conta!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
