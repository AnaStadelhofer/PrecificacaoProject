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
    minWidth: 250,
    minHeight: 250,
    marginBottom: 10,
    maxWidth: '60%',
    maxHeight: '20%',
  },
});
