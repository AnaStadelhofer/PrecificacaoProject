import { useEffect, useState } from "react";
import { View, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { addDoc, collection } from "firebase/firestore";

import { Checkbox, Text, TextInput } from "react-native-paper";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { styles } from "../utils/styles";
import ButtonCentralized from "../components/ButtonCentralized";
import Divider from "../components/Divider";

export default function RegisterUserScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [mailUser, setMailUser] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(
      nameUser !== "" &&
        mailUser !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        emailError == "" &&
        passwordError == "" &&
        confirmPasswordError == "" &&
        nameError == "" &&
        isSelected == true
    );
  }, [nameUser, mailUser, password, confirmPassword, isSelected]);

  const handleRegister = async () => {
    try {
      createUserWithEmailAndPassword(auth, mailUser, password)
        .then((userCredential) => {
          console.log(userCredential, "Usuário registrado com sucesso");
          const userUID = userCredential.user.uid;

          const dadosParaInserir = {
            name: nameUser,
            terms: true,
            userUID: userUID,
          };
          const collectionRef = collection(db, "Users");

          const docRef = addDoc(collectionRef, dadosParaInserir)
            .then((docRef) => {
              console.log("Documento inserido com sucesso: ", docRef.id);
              navigation.navigate("LoginScreen");
            })
            .catch((error) => {
              console.log("Erro ao inserir o documento: ", error);
            });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              console.log("Esse endereço de e-mail já está sendo usado.");
              Alert.alert(
                "Erro",
                "Esse endereço de e-mail já está sendo usado."
              );
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
              console.log(
                "Não foi possível encontrar um usuário com esse e-mail e senha."
              );
              Alert.alert(
                "Erro",
                "Não foi possível encontrar um usuário com esse e-mail e senha."
              );
              break;
            case "auth/wrong-password":
              console.log("A senha inserida está incorreta.");
              Alert.alert("Erro", "A senha inserida está incorreta.");
              break;
            default:
              // console.log("Ocorreu um erro desconhecido:", error);
              Alert.alert(
                "Erro",
                "Parece que ocorreu um erro, tente mais tarde."
              );
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
      setEmailError("E-mail informado é inválido.");
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
    } else if (nameUser.length < 3) {
      setNameError("O nome deve ter no minimo 3 caracteres.");
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
      setPasswordError("A senha pestá fraca.");
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

  const toggleCheckbox = () => {
    setIsSelected(!isSelected);
    console.log(isSelected)
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TextInput
          placeholder="Nome"
          secureTextEntry={false}
          textContentType="text"
          value={nameUser}
          onChangeText={validateName}
          style={nameError ? styles.inputError : styles.input}
          keyBoardType="default"
        />
        {nameError && <Text style={styles.error}>{nameError}</Text>}

        <TextInput
          placeholder="Email"
          textContentType="emailAddress"
          value={mailUser}
          onChangeText={validateEmail}
          style={emailError ? styles.inputError : styles.input}
          keyBoardType="email-address"
        />
        {emailError && <Text style={styles.error}>{emailError}</Text>}

        <TextInput
          placeholder="Senha"
          secureTextEntry={!showPassword}
          textContentType="password"
          value={password}
          onChangeText={validatePassword}
          style={passwordError ? styles.inputError : styles.input}
          keyBoardType="default"
          right={
            <TextInput.Icon
              icon={showPassword ? "eye" : "eye-off"}
              size={20}
              style={{ marginRight: 10 }}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        {passwordError && <Text style={styles.error}>{passwordError}</Text>}

        <TextInput
          placeholder="Confirmar Senha"
          secureTextEntry={!showPasswordConfirm}
          textContentType="password"
          value={confirmPassword}
          onChangeText={validatePasswordEqual}
          style={confirmPasswordError ? styles.inputError : styles.input}
          keyBoardType="default"
          right={
            <TextInput.Icon
              icon={showPasswordConfirm ? "eye" : "eye-off"}
              size={20}
              style={{ marginRight: 10 }}
              onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
            />
          }
        />
        {confirmPasswordError && (
          <Text style={styles.error}>{confirmPasswordError}</Text>
        )}

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={toggleCheckbox}
          >
            <View
              style={isSelected ? styles.checkboxSelected : styles.checkbox}
            ></View>
            
          </TouchableOpacity>
          <Text style={styles.textTerms}>Concordo com os termos de privacidade</Text>
        </View>

        <ButtonCentralized text='Confirmar' handle={handleRegister} disable={isButtonEnabled} />

        <Divider />

        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.link}>Já possuo conta.</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
