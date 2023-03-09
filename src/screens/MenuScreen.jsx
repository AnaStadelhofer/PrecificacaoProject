import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { Text, TouchableOpacity, Dimensions} from "react-native"

// IMPORT THE SCREENS
import LoginScreen from './LoginScreen';
import RegisterUserScreen from './RegisterUserScreen';

const { width } = Dimensions.get('window');


const Stack = createNativeStackNavigator();

function OptionsMenu({ navigation }) {

    return (
        <View style={styles.container}>
            <SafeAreaView>
                {/* <ButtonCentralized title="Receita" onPress={() => navigation.navigate('RevenueScreen')}/>
                <ButtonCentralized title="Relatório" onPress={() => navigation.navigate('ReportScreen')}/>
                <ButtonCentralized title="Clientes" onPress={() => navigation.navigate('ClientScreen')}/> */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterUserScreen')}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
                {/* <ButtonCentralized title="Carrinho" onPress={() => navigation.navigate('CartScreen')}/> */}
                {/* <ButtonCentralized title="Recuperar" onPress={() => navigation.navigate('RecoverPasswordScreen')}/> */}
            </SafeAreaView>
        </View>
    )
}

export default function MenuScreen() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MenuScreen">
                <Stack.Screen name="MenuScreen" component={OptionsMenu} options={{ title: 'Menu', headerShown: false}}/>
                {/* <Stack.Screen name="RevenueScreen" component={RevenueScreen} options={{ title: 'Receitas' }}/> 
                <Stack.Screen name="ReportScreen" component={ReportScreen} options={{ title: 'Relatório' }}/>
                <Stack.Screen name="ClientScreen" component={ClientScreen} options={{ title: 'Clientes' }}/> */}
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login', headerShown: false}} />
                {/* <Stack.Screen name="CartScreen" component={CartScreen} options={{ title: 'Carrinho' }}/> */}
                <Stack.Screen name="RegisterUserScreen" component={RegisterUserScreen} options={{ title: 'Cadastrar', headerShown: false}} />
                {/* <Stack.Screen name="RecoverPasswordScreen" component={RecoverPasswordScreen} options={{ title: 'Recuperar senha' }}/> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.6,
        height: 50,
        backgroundColor: '#2196f3',
        borderRadius: 5,
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
})
