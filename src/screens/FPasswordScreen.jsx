import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { styles } from "../utils/styles";
import { NavigationContainer } from '@react-navigation/native';

import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../components/Logo";

import { Alert } from "react-native";
import Divider from "../components/Divider";

export default function FPasswordScreen({ navigation }) {
  const [newpassword, setNewPassword] = useState("");
  const [newconfirmpassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);

  const validatePasswordEqual = (newconfirmpassword) => {
    setConfirmNewPassword(newconfirmpassword);
    if (newpassword === newconfirmpassword) {
      setErrorMessage("");
    } else {
      setErrorMessage("Senhas não coincidem.");
    }
  }

  return (
    <View style={styles.container}>
      <Logo />
      <SafeAreaView>
      
      <View>
        <TextInput
          placeholder="Senha"
          secureTextEntry={showNewPassword}
          textContentType="password"
          value={newpassword}
          onChangeText={setNewPassword}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={showNewPassword ? "eye" : "eye-off"}
              size={20}
              style={{ marginRight: 10 }}
              onPress={() => setShowNewPassword(!showNewPassword)}
            />
          }
        />
        <TextInput
          placeholder="Confirmar Senha"
          secureTextEntry={showConfirmNewPassword}
          textContentType="password"
          value={newconfirmpassword}
          onChangeText={validatePasswordEqual}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={showConfirmNewPassword ? "eye" : "eye-off"}
              size={20}
              style={{ marginRight: 10 }}
              onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            />
          }
        >
        </TextInput>

        </View>

        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
        <Divider />
        <View style={styles.textLinks}>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.link}>Voltar para o login?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
