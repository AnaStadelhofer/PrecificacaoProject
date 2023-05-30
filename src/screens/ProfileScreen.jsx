import { Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../utils/styles";
import { TouchableOpacity } from "react-native";
import { auth } from "../config/firebase";
import { useState } from "react";



export default function ProfileScreen() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        console.log('Sign-out successful');
        setIsLoggedOut(true);
        console.log(auth.currentUser)
      })
      .catch((error) => {
        console.log('Sign-out error:', error);
      });
  };

  if (isLoggedOut) {
    navigation.navigate('LoginScreen');
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.centerInfo,
          { justifyContent: "flex-start", marginTop: "50px" },
        ]}
      >
        <Text style={styles.welcomeUser}>Bem-vindo (a), Ana!</Text>
        <Text style={styles.infoUser}>Informações do seu perfil.</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="Ana Carolina Stadelhofer"
          // secureTextEntry={showPassword}
          textContentType="text"
          // value={password}
          // onChangeText={setPassword}
          style={[styles.input, { height: "45px", width: "360px" }]}
          editable={false}
        />
        <TextInput
          placeholder="ana.stadelhofer@teste.com.br"
          // secureTextEntry={showPassword}
          textContentType="text"
          // value={password}
          // onChangeText={setPassword}
          style={[styles.input, { height: "45px", width: "360px" }]}
          editable={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
          style={[
            styles.buttonProfileDiv,
            { height: "45px", width: "170px", marginBottom: "2px" },
          ]}
        >
          <Text style={styles.buttonProfile}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
          style={[
            styles.buttonProfileDiv,
            { height: "45px", width: "170px", marginBottom: "2px" },
          ]}
        >
          <Text style={styles.buttonProfile}>Editar senha</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonCenterContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { height: "45px", width: "360px", marginBottom: "200px" },
          ]}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Deslogar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
