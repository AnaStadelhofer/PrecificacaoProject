import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { styles } from "../utils/styles";
import Logo from "../components/Logo";
import Divider from "../components/Divider";

export default function FPasswordScreen({ navigation }) {
  const [newpassword, setNewPassword] = useState("");
  const [newconfirmpassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);

  const validatePasswordEqual = (newconfirmpassword) => {
    try {
      setConfirmNewPassword(newconfirmpassword);
      if (newpassword === newconfirmpassword) {
        setErrorMessage("");
      } else {
        setErrorMessage("Senhas não coincidem.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <SafeAreaView style={styles.RegisterCamps}>
        <View>
          <TextInput
            placeholder="Senha"
            label="Senha"
            secureTextEntry={showNewPassword}
            textContentType="password"
            value={newpassword}
            onChangeText={setNewPassword}
            style={styles.input}
            // underlineColor="transparent"
            // activeUnderlineColor="transparent"
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
            label="Confirmar Senha"
            secureTextEntry={showConfirmNewPassword}
            textContentType="password"
            value={newconfirmpassword}
            onChangeText={validatePasswordEqual}
            style={styles.input}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            right={
              <TextInput.Icon
                icon={showConfirmNewPassword ? "eye" : "eye-off"}
                size={20}
                style={{ marginRight: 10 }}
                onPress={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
              />
            }
          />
        </View>

        <TouchableOpacity style={styles.button}>
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
