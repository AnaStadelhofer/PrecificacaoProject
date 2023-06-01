import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { styles } from "../utils/styles";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../components/Logo";
import CartScreen from "./CartScreen";

import { Alert } from "react-native";
import Divider from "../components/Divider";

export default function LoginScreen({ navigation }) {
  const [mailUser, setMailUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailError, setEmailError] = useState("");


  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in: ", user);
      navigation.navigate("MenuScreen")
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        // setErrorMessage("Este usuário não existe. Por favor, verifique o e-mail.");
        Alert.alert(
          "Erro",
          "Este usuário não existe. Por favor, verifique o e-mail."
        );
      } else if (error.code === "auth/wrong-password") {
        Alert.alert(
          "Erro",
          "E-mail ou Senha incorreta. Por favor, tente novamente."
        );
        // setErrorMessage("E-mail ou Senha incorreta. Por favor, tente novamente.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert(
          "Erro",
          "Endereço de e-mail inválido. Por favor, verifique e tente novamente."
        );
        // setErrorMessage("Endereço de e-mail inválido. Por favor, verifique e tente novamente.");
      } else {
        Alert.alert(
          "Erro",
          "Ocorreu um erro ao fazer login. Por favor, tente novamente."
        );
        // setErrorMessage("Ocorreu um erro ao fazer login. Por favor, tente novamente.");
      }
      console.log("Error logging in: ", error);
    }
  };

  const validateEmail = (mailUser) => {
    const emailRegex = /\S+@\S+\.\S+/;
    setMailUser(mailUser);

    if (mailUser == "") {
      setEmailError("");
    } else if (!emailRegex.test(mailUser)) {
      setEmailError("E-mail informado é inválido.");
    } else {
      setEmailError("");
    }
  };

  return (
    <View style={[styles.container, {alignItems: 'center'}]}>
      <Logo />
      <SafeAreaView>
        <View>
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          <TextInput
            placeholder="E-mail"
            secureTextEntry={false}
            textContentType="emailAddress"
            value={mailUser}
            onChangeText={validateEmail}
            keyboardType="email-address"
            style={emailError ? styles.inputError : styles.input}
          />
          {emailError && <Text style={styles.error}>{emailError}</Text>}

          <TextInput
            placeholder="Senha"
            secureTextEntry={showPassword}
            textContentType="password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            keyboardType="default"
            right={
              <TextInput.Icon
                icon={showPassword ? "eye" : "eye-off"}
                size={20}
                style={{ marginRight: 10 }}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          ></TextInput>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => login(mailUser, password)}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
        <Divider />
        <View style={styles.textLinks}>
          <TouchableOpacity
            onPress={() => navigation.navigate("FPasswordScreen")}
          >
            <Text style={styles.link}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterUserScreen")}
          >
            <Text style={styles.link}>Não possuo conta</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
