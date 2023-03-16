import { useEffect, useState } from "react";
import { View, SafeAreaView, TouchableOpacity, Alert, Dimensions, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Feather from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");

export default function RegisterUserScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [mailUser, setMailUser] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    setIsButtonEnabled(
      nameUser !== "" &&
        mailUser !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        emailError == "" &&
        passwordError == "" &&
        confirmPasswordError == "" &&
        nameError == ""
    );
  }, [nameUser, mailUser, password, confirmPassword]);

  const handleRegister = async () => {
    try {
      createUserWithEmailAndPassword(auth, mailUser, password)
        .then(() => {
          //navigation.navigate("MenuScreen");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              console.log("Esse endereço de e-mail já está sendo usado.");
              Alert.alert("Erro", "Esse endereço de e-mail já está sendo usado.");
              break;
            case "auth/invalid-email":
              console.log("Esse endereço de e-mail é inválido.");
              Alert.alert("Erro", "Esse endereço de e-mail é inválido.");
              break;
            case "auth/weak-password":
              console.log("Essa senha é muito fraca.");
              Alert.alert("Erro", "Essa senha é muito fraca.");
              break;
            case "auth/user-not-found":
              console.log("Não foi possível encontrar um usuário com esse e-mail e senha.");
              Alert.alert("Erro", "Não foi possível encontrar um usuário com esse e-mail e senha.");
              break;
            case "auth/wrong-password":
              console.log("A senha inserida está incorreta.");
              Alert.alert("Erro", "A senha inserida está incorreta.");
              break;
            default:
              console.log("Ocorreu um erro desconhecido:", error);
              Alert.alert("Erro", "Parece que ocorreu um erro, tente mais tarde.");
              break;
          }
        });
    } catch (error) {}
  };

  const validateEmail = (mailUser) => {
    const emailRegex = /\S+@\S+\.\S+/;
    setMailUser(mailUser);

    if (mailUser == "") {
      setEmailError("");
    } else if (!emailRegex.test(mailUser)) {
      setEmailError("Por favor, insira um email válido.");
    } else {
      setEmailError("");
    }
  };

  const validateName = (nameUser) => {
    const nameRegex = /^[a-zA-z/s]*$/;
    setNameUser(nameUser);

    if (nameUser == "") {
      setNameError("");
    } else if (!nameRegex.test(nameUser)) {
      setNameError("O nome deve conter apenas letras.");
    } else {
      setNameError("");
    }
  };

  function isStrongPassword(password) {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return strongRegex.test(password);
  }

  const validatePassword = (password) => {
    setPassword(password);

    if (password == "") {
      setPasswordError("");
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      validatePasswordEqual();
    } else if (!isStrongPassword(password)) {
      setPasswordError("A senha precisa ser forte");
      validatePasswordEqual();
    } else {
      setPasswordError("");
      validatePasswordEqual();
    }
  };

  const validatePasswordEqual = (confirmPassword) => {
    setConfirmPassword(confirmPassword);

    if (confirmPassword == "") {
      setConfirmPasswordError("");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem.");
    } else {
      setConfirmPasswordError("");
    }
  };

  function renderPasswordVisibilityIcon() {
    if (showPassword) {
      return (
        <Feather
          name="eye-off"
          color="grey"
          size={20}
          onPress={() => setShowPassword(false)}
        />
      );
    } else {
      return (
        <Feather
          name="eye"
          color="grey"
          size={20}
          onPress={() => setShowPassword(true)}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TextInput
          placeholder="Nome *"
          secureTextEntry={false}
          textContentType="text"
          value={nameUser}
          onChangeText={validateName}
          style={nameError ? styles.inputError : styles.input}
        />
        {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

        <TextInput
          placeholder="Email *"
          textContentType="emailAddress"
          value={mailUser}
          onChangeText={validateEmail}
          style={emailError ? styles.inputError : styles.input}
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <TextInput
          placeholder="Senha *"
          secureTextEntry={!showPassword}
          textContentType="password"
          value={password}
          onChangeText={validatePassword}
          style={passwordError ? styles.inputError : styles.input}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            {passwordError ? (
              <Text style={styles.error}>{passwordError}</Text>
            ) : null}
          </View>
          {/* {renderPasswordVisibilityIcon()} */}
        </View>

        <TextInput
          placeholder="Confirmar Senha *"
          secureTextEntry={!showPassword}
          textContentType="password"
          value={confirmPassword}
          onChangeText={validatePasswordEqual}
          style={confirmPasswordError ? styles.inputError : styles.input}
        />
        {confirmPasswordError ? (
          <Text style={styles.error}>{confirmPasswordError}</Text>
        ) : null}

        <TouchableOpacity
          style={isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled}
          disabled={!isButtonEnabled}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.link}>Já possuo conta!</Text>
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
  error: {
    color: "red",
  },
  buttonEnabled: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.75,
    height: 50,
    backgroundColor: "#2196f3",
    borderRadius: 5,
    marginTop: 15,
  },
  buttonDisabled: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.75,
    height: 50,
    borderRadius: 5,
    marginTop: 15,
    backgroundColor: "gray",
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
    marginTop: 30,
    width: width * 0.75,
  },
  inputError: {
    height: 60,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 30,
    width: width * 0.75,
  },
  link: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#2196f3",
    textAlign: "center",
  },
});
