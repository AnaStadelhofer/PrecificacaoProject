import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { styles } from "../utils/styles";
import { auth } from "../config/firebase";
import { getUserData } from "../utils/user";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigation.navigate("LoginScreen");
      } else {
        const userData = await getUserData();
        setUser(userData);
      }
    };

    checkAuthentication();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Sign-out successful");
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        console.log("Sign-out error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.centerInfo, { justifyContent: "flex-start" }]}>
        <Text style={styles.welcomeUser}>
          Bem-vindo (a), {user ? user.name: ""}!
        </Text>
        <Text style={styles.infoUser}>Informações do seu perfil.</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder={user ? user.name : ""}
          // secureTextEntry={showPassword}
          textContentType="text"
          // value={password}
          // onChangeText={setPassword}
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          editable={false}
        />
        <TextInput
          placeholder={auth.currentUser?.email}
          // secureTextEntry={showPassword}
          textContentType="text"
          // value={password}
          // onChangeText={setPassword}
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
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
          style={styles.buttonDeslog}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Deslogar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
