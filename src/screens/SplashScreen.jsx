import { Image, View, Text } from "react-native";
import Loading from "../components/Loading";
import { StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {

    setTimeout(
        () => {
            navigation.navigate("LoginScreen");
        }, 3000
    )

    return (
        <View
            style={styles.container}
        >

            <Loading/>
            <Text>Bem-vindo ao nosso aplicativo!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    }
})