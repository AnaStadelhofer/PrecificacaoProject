import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <Image
      source={require('../../assets/logo2.jpg')}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    minWidth: 200,
    minHeight: 200,
    marginBottom: 10,
    maxWidth: '40%',
    maxHeight: '20%',
  },
});
