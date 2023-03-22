import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { styles } from "../utils/styles";

import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../components/Logo";

export default function LoginScreen({ navigation }) {
  const [mailUser, setMailUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

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
      console.log("Error logging in: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <SafeAreaView>
        <View>
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
          ></TextInput>
        </View>
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye-slash" : "eye"} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => login(mailUser, password)}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MenuScreen")}>
          <Text style={styles.link}>Esqueci minha senha!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterUserScreen")}
        >
          <Text style={styles.link}>Não possuo conta!</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}