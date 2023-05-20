import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <Image
      source={{
        uri: "https://cdn-icons-png.flaticon.com/512/138/138239.png",
      }}
      // source={require("../../assets/favicon.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
});
