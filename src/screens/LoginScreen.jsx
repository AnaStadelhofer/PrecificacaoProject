import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, SafeAreaView, Dimensions, TextInput, Text } from "react-native";
import { useLayoutEffect } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

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
      <SafeAreaView>
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
        >
          
        </TextInput>
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

        <TouchableOpacity onPress={() => navigation.navigate("RegisterUserScreen")}>
          <Text style={styles.link}>Não possuo conta!</Text>
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
  link: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#2196f3",
    textAlign: "center",
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
});
