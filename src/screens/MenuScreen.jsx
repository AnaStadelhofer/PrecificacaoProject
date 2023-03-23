import { View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, Dimensions} from "react-native"
import { styles } from '../utils/styles';

// IMPORT THE SCREENS
import LoginScreen from './LoginScreen';
import RegisterUserScreen from './RegisterUserScreen';
import SplashScreen from './SplashScreen';

// IMPORT COMPONENTS
import Logo from '../components/Logo';

const Stack = createNativeStackNavigator();

function OptionsMenu({ navigation }) {

    return (
        <View style={styles.container}>
            <Logo/>
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
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SplashScreen')}>
                    <Text style={styles.buttonText}>SplashScreen</Text>
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
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ title: 'Menu', headerShown: false}}/>
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

