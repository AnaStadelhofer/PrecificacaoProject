import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <Image
      // source={{
      //   uri: "https://tenor.com/pt-BR/view/loading-waiting-buffering-gif-15460501.gif",
      // }}
      source={require("../../assets/favicon.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginBottom: 25,
  },
});
