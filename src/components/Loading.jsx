import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Loading() {
  return (
    <Image
      source={{
        uri: "https://tenor.com/pt-BR/view/loading-waiting-buffering-gif-15460501.gif",
      }}
      // source={require("../../assets/loading-top.gif")}
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
