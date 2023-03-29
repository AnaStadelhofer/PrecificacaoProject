import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <Image
      source={{
        uri: "https://hotmart.s3.amazonaws.com/product_contents/a840e4ba-9f88-43fd-a0fe-67b57c0805c0/precoacessivelicone.png",
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
    marginBottom: 20,
  },
});
