import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { TextInput, Text, Dialog, Button } from "react-native-paper";
import { styles } from "../utils/styles";
import { auth, passwordReset } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../components/Logo";
import { Alert } from "react-native";
import Divider from "../components/Divider";
import { FirebaseError } from "firebase/app";

export default function RecoveryScreen({ navigation }) {
  const [mailUser, setMailUser] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState("false");

  const handleRecovery = async (email) => {
    if (mailUser.trim() === "") {
      setErrorMessage("Por favor, insira o e-mail.");
      return;
    }
    try {
      // await auth.sendPasswordResetEmail(email);
      passwordReset(email);
      setDialogVisible(true);
      Alert.alert(
        "Sucesso",
        "Um e-mail de recuperação foi enviado para o endereço informado."
      );
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        // Email não encontrado
        Alert.alert(
          "Erro",
          "Este usuário não existe. Por favor, verifique o e-mail."
        );
      } else if (error.code === "auth/invalid-email") {
        //Email Invalido
        Alert.alert(
          "Erro",
          "Endereço de e-mail inválido. Por favor, verifique e tente novamente."
        );
      } else {
        setErrorMessage("Error recovering password. Please try again later.");
        console.log("Error recovering password: ", error);
      }
    }
  };

  const validateEmail = (mailUser) => {
    const emailRegex = /\S+@\S+\.\S+/;
    setMailUser(mailUser);

    if (mailUser === "") {
      setErrorMessage("");
      setIsEmailValid(false);
    } else if (!emailRegex.test(mailUser)) {
      setErrorMessage("E-mail informado é inválido.");
      setIsEmailValid(false);
    } else {
      checkExistingEmail(mailUser);
      setIsEmailValid(true);
    }
  };

  const checkExistingEmail = async (mailUser) => {
    try {
      const snapshot = await Firebase.firestore()
        .collection("users")
        .where("email", "==", mailUser)
        .get();

      if (!snapshot.empty) {
        setErrorMessage("E-mail já cadastrado.", error);
      } else {
        setErrorMessage("");
      }
    } catch {
      console.log("Erro ao validar e-mail.");
      return false;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Logo />
      <SafeAreaView style={styles.RegisterCamps}>
        <View>
          {errorMessage !== "" && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          <TextInput
            borderRadius={10}
            placeholder="Email de recuperação"
            label="Email de recuperação"
            secureTextEntry={false}
            textContentType="emailAddress"
            value={mailUser}
            onChangeText={validateEmail}
            style={styles.input}
            // underlineColor="transparent"
            // activeUnderlineColor="transparent"
          />
          <TouchableOpacity
            style={[styles.buttonLogin, {marginTop: '5%'}]}
            onPress={() => handleRecovery(mailUser)}
            disabled={!isEmailValid || mailUser.trim() === ""}
          >
            <Text style={styles.buttonText}>Recuperar Senha</Text>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={[styles.link, { color: "#CDCDCD" }]} color="#CDCDCD">
              Voltar para login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <Dialog.Title>Success</Dialog.Title>
        <Dialog.Content>
          <Text>
            Um e-mail de recuperação foi enviado para o endereço informado.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDialogVisible(false)}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
