import { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { addDoc, collection } from "firebase/firestore";

import { Checkbox, Text, TextInput } from "react-native-paper";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { styles } from "../utils/styles";
import ButtonCentralized from "../components/ButtonCentralized";
import Divider from "../components/Divider";
import { ScrollView } from "react-native-web";

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
  const [showTermsModal, setShowTermsModal] = useState(false);

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
            mail: mailUser,
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
    } else if (!isStrongPassword(password)) {
      setPasswordError("A senha está fraca.");
    } else {
      setPasswordError("");
    }
    validatePasswordEqual(confirmPassword);
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
    console.log(isSelected);
  };

  const openTermsModal = () => {
    setShowTermsModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  return (
    <View style={[styles.container, { alignItems: "center" }]}>
      <SafeAreaView>
        <TextInput
          placeholder="Nome"
          label="Nome"
          secureTextEntry={false}
          textContentType="text"
          value={nameUser}
          onChangeText={validateName}
          style={nameError ? styles.inputError : styles.input}
          // underlineColor="transparent"
          // activeUnderlineColor="transparent"
          keyBoardType="default"
        />
        {nameError && <Text style={styles.error}>{nameError}</Text>}

        <TextInput
          placeholder="Email"
          label="Email"
          textContentType="emailAddress"
          value={mailUser}
          onChangeText={validateEmail}
          style={emailError ? styles.inputError : styles.input}
          // underlineColor="transparent"
          // activeUnderlineColor="transparent"
          keyBoardType="email-address"
        />
        {emailError && <Text style={styles.error}>{emailError}</Text>}

        <TextInput
          placeholder="Senha"
          label="Senha"
          secureTextEntry={!showPassword}
          textContentType="password"
          value={password}
          onChangeText={validatePassword}
          style={passwordError ? styles.inputError : styles.input}
          // underlineColor="transparent"
          // activeUnderlineColor="transparent"
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
          label="Confirmar Senha"
          secureTextEntry={!showPasswordConfirm}
          textContentType="password"
          value={confirmPassword}
          onChangeText={validatePasswordEqual}
          style={confirmPasswordError ? styles.inputError : styles.input}
          // underlineColor="transparent"
          // activeUnderlineColor="transparent"
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

        <View style={[styles.checkboxContainer, , { marginTop: 20 }]}>
          <TouchableOpacity onPress={toggleCheckbox}>
            <View
              style={isSelected ? styles.checkboxSelected : styles.checkbox}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openTermsModal}>
            <Text style={styles.termsText}>
              Concordo com os <Text style={{textDecorationLine: 'underline'}}>Termos de Serviço</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <ButtonCentralized
          text="Confirmar"
          handle={handleRegister}
          disable={isButtonEnabled}
        />

        <Divider />

        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.link}>Já possuo conta</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <Modal visible={showTermsModal} animationType="slide">
        <SafeAreaView style={styles.container}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              TERMOS DE SERVIÇO - APLICATIVO PRISET
            </Text>
            <Text style={styles.modalSubText}>
              Bem-vindo ao aplicativo PRISET!
            </Text>
            <Text style={styles.modalText}>
              Ao utilizar nosso aplicativo, você concorda com os seguintes
              termos de serviço:
            </Text>

              <Text style={styles.modalText}>
                Uso do Aplicativo O aplicativo PRISET permite aos usuários
                realizar precificação de produtos por meio do registro de
                informações de e-mail, senha e nome. Os dados fornecidos serão
                armazenados em nosso banco de dados para fins de autenticação e
                identificação do usuário. Responsabilidade do Usuário Ao
                utilizar o aplicativo PRISET, você é responsável por fornecer
                informações de e-mail e senha corretas e mantê-las atualizadas.
                Você concorda em manter suas credenciais de login em sigilo e
                não compartilhá-las com terceiros. Qualquer atividade realizada
                em sua conta é de sua responsabilidade. Privacidade Levamos a
                privacidade dos usuários a sério. O aplicativo PRISET coleta e
                armazena apenas as informações de e-mail, senha e nome
                fornecidas pelo usuário. Nenhum dado pessoal adicional é
                coletado sem o seu consentimento. Tomamos medidas adequadas para
                proteger suas informações, seguindo as práticas recomendadas de
                segurança de dados. Uso das Informações As informações
                fornecidas pelo usuário serão utilizadas exclusivamente para
                fins de autenticação, identificação e funcionamento adequado do
                aplicativo PRISET. Não compartilhamos, vendemos ou divulgamos
                suas informações pessoais a terceiros, a menos que seja
                necessário para cumprir com requisitos legais ou com o seu
                consentimento. Alterações nos Termos de Serviço Reservamo-nos o
                direito de alterar estes termos de serviço a qualquer momento.
                Se ocorrerem alterações, você será notificado por meio do
                aplicativo ou por outro meio de comunicação fornecido. É
                responsabilidade do usuário revisar periodicamente os termos de
                serviço atualizados. Limitação de Responsabilidade O uso do
                aplicativo PRISET é por sua conta e risco. Não nos
                responsabilizamos por quaisquer danos diretos, indiretos,
                incidentais, consequenciais ou outros tipos de danos decorrentes
                do uso ou incapacidade de uso do aplicativo. Contato Se você
                tiver alguma dúvida, sugestão ou preocupação sobre estes termos
                de serviço ou sobre o aplicativo PRISET, entre em contato
                conosco pelo e-mail support@prisetapp.com.
              </Text>

            <View>
              <TouchableOpacity
                onPress={closeTermsModal}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonContainer}>FECHAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
