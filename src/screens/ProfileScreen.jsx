import { Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../utils/styles";
import { TouchableOpacity } from "react-native";
import { auth } from "../config/firebase";
import { useState } from "react";
import { useEffect } from "react";
import { getUserData } from "../utils/user";

export default function ProfileScreen({navigation}) {

  const [user, setUser] = useState(null);

const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        console.log('Sign-out successful');
        navigation.navigate('LoginScreen');
        console.log(auth.currentUser)
      })
      .catch((error) => {
        console.log('Sign-out error:', error);
      });
  };


  useEffect(() => {
    const currentUser = auth.currentUser;
    console.log(currentUser);
    if (currentUser) {
      getUserData().then((data) => {
        setUser(data);
        console.log(data);
      });
      // setUser(currentUser);
    }
  }, [auth?.currentUser]);
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
