import { View, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useRef } from 'react';
import { TextInput, Text } from "react-native-paper";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { app } from "../config/firebase";
import { Animated, StyleSheet } from 'react-native';
import { useEffect, useState } from "react";
import { styles } from "../utils/styles";
import CartList from "./CartList";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Recipes({ navigation }) {
    const handleButtonPress = () => {
    };
    const [expanded, setExpanded] = useState(false);
    const heightAnim = useRef(new Animated.Value(0)).current;
    const [messageVisible, setMessageVisible] = useState(false);

    const handleItemPress = () => {
        Animated.timing(heightAnim, {
          toValue: expanded ? 0 : 200, 
          duration: 300,
          useNativeDriver: false,
        }).start();
        setExpanded(!expanded);
      };

    return (
        <View style={styles.container}>
            {messageVisible ? (<Text
                style={styles.textInittial}
            >Ops! Parece que você não criou nenhuma receita ainda!</Text>)
                : (
                    <View style={styles.container}>
                    <TouchableOpacity style={styles.item} onPress={handleItemPress}>
                        <Text style={styles.itemText}>Clique para expandir</Text>
                    </TouchableOpacity>
                    <Animated.View style={[styles.expandedItem, { height: heightAnim }]}>
                        <Text style={styles.itemText}>Me expandi</Text>
                    </Animated.View>
                    </View>
                )}
            <TouchableOpacity style={styles.recipebutton} onPress={handleButtonPress}>
                <Icon name="plus" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}