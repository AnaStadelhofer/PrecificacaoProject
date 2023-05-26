import { View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, Dimensions} from "react-native"
import { styles } from '../utils/styles';

// IMPORT THE SCREENS
import LoginScreen from './LoginScreen';
import RegisterUserScreen from './RegisterUserScreen';
import SplashScreen from './SplashScreen';
import CartScreen from './CartScreen';
import ProfileScreen from './ProfileScreen';
import RecoveryScreen from './RecoveryScreen';
import FPasswordScreen from './FPasswordScreen';
import Recipes from './Recipes';
import RecipeAdd from './RecipeAdd';
import IngredientAdd from './IngredientAdd';


// IMPORT COMPONENTS
import Logo from '../components/Logo';

const Stack = createNativeStackNavigator();

function OptionsMenu({ navigation }) {

    return (
        <View style={styles.container}>
            <Logo/>
            <SafeAreaView>
                <Text style={styles.textInittial}> Seja bem-vindo ao nosso aplicativo! </Text>
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
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CartScreen')}>
                    <Text style={styles.buttonText}>Carrinho</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recipes')}>
                    <Text style={styles.buttonText}>Receitas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileScreen')}>
                    <Text style={styles.buttonText}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RecoveryScreen')}>
                    <Text style={styles.buttonText}>RecoveryScreen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RecipeAdd')}>
                    <Text style={styles.buttonText}>Criar receita</Text>
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
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login'}} />
                <Stack.Screen name="CartScreen" component={CartScreen} options={{ title: 'Carrinho' }}/>
                <Stack.Screen name="RegisterUserScreen" component={RegisterUserScreen} options={{ title: 'Cadastrar'}} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Perfil'}} />
                <Stack.Screen name="RecipeAdd" component={RecipeAdd} options={{ title: 'Criar receita'}} />


                <Stack.Screen name="FPasswordScreen" component={FPasswordScreen} options={{ title: 'FSenha'}} />
                <Stack.Screen name="Recipes" component={Recipes} options={{ title: 'Receitas'}} />
                <Stack.Screen name="RecoveryScreen" component={RecoveryScreen} options={{ title: 'RecoveryScreen'}} />
                <Stack.Screen name="IngredientAdd" component={IngredientAdd} options={{ title: 'IngredientAdd'}} />


                {/* <Stack.Screen name="RecoverPasswordScreen" component={RecoverPasswordScreen} options={{ title: 'Recuperar senha' }}/> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

