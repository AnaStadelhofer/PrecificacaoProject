import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { TextInput, Text, Dialog } from "react-native-paper";
import { styles } from "../utils/styles";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../components/Logo";
import { Alert } from "react-native";
import Divider from "../components/Divider";

export default function RecoveryScreen({ navigation }) {
  const [mailUser, setMailUser] = useState("");
  const [DialogVisible, setDialogVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRecovery = async (email) => {
    if (mailUser.trim() === "") {
        setErrorMessage("Por favor, insira o e-mail.");
        return;
    }
    try {
      await auth.sendPasswordResetEmail(email);
      setDialogVisible(true);
      Alert.alert(
        "Sucesso",
        "Um e-mail de recuperação foi enviado para o endereço informado."
      );
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Alert.alert(
          "Erro",
          "Este usuário não existe. Por favor, verifique o e-mail."
        );
      } else if (error.code === "auth/invalid-email") {
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

  return (
    <View style={styles.container}>
      <Logo />
      <SafeAreaView>
        <View>
          {errorMessage !== "" && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          <TextInput
            placeholder="Email"
            secureTextEntry={false}
            textContentType="emailAddress"
            value={mailUser}
            onChangeText={(mailUser) => setMailUser(mailUser)}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => Recovery(mailUser)}
            disable={!mailUser}
          >
            <Text style={styles.buttonText}>Recuperar Senha</Text>
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
