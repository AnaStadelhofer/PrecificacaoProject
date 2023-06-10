import { View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, Dimensions } from "react-native";
import { styles } from "../utils/styles";

// IMPORT THE SCREENS
import LoginScreen from "./LoginScreen";
import RegisterUserScreen from "./RegisterUserScreen";
import CartScreen from "./CartScreen";
import ProfileScreen from "./ProfileScreen";
import RecoveryScreen from "./RecoveryScreen";
import FPasswordScreen from "./FPasswordScreen";
import Recipes from "./Recipes";
import RecipeAdd from "./RecipeAdd";
import IngredientAdd from "./IngredientAdd";
import CartAdd from "./CartAdd";
import IngredientList from "./IngredientList";
import RecipesList from "./RecipesList";

// IMPORT COMPONENTS
import Logo from "../components/Logo";

const Stack = createNativeStackNavigator();

function OptionsMenu({ navigation }) {
  return (
    <View style={[styles.container, { alignItems: "center" }]}>
      <Logo />
      <SafeAreaView>
        <Text style={styles.textInittial}>
          {" "}
          Seja bem-vindo ao nosso aplicativo!{" "}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RegisterUserScreen")}
        >
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CartScreen")}
        >
          <Text style={styles.buttonText}>Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Recipes")}
        >
          <Text style={styles.buttonText}>Receitas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RecoveryScreen")}
        >
          <Text style={styles.buttonText}>RecoveryScreen</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

export default function MenuScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MenuScreen">
        <Stack.Screen
          name="MenuScreen"
          component={OptionsMenu}
          options={{ title: "Menu", headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{ title: "Carrinho" }}
        />
        <Stack.Screen
          name="RegisterUserScreen"
          component={RegisterUserScreen}
          options={{ title: "Cadastrar" }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ title: "Perfil" }}
        />
        <Stack.Screen
          name="RecipeAdd"
          component={RecipeAdd}
          options={{ title: "Criar receita" }}
        />
        <Stack.Screen
          name="FPasswordScreen"
          component={FPasswordScreen}
          options={{ title: "FSenha" }}
        />
        <Stack.Screen
          name="Recipes"
          component={Recipes}
          options={{ title: "Receitas" }}
        />
        <Stack.Screen
          name="RecoveryScreen"
          component={RecoveryScreen}
          options={{ title: "RecoveryScreen" }}
        />
        <Stack.Screen
          name="IngredientAdd"
          component={IngredientAdd}
          options={{ title: "IngredientAdd" }}
        />
        <Stack.Screen
          name="CartAdd"
          component={CartAdd}
          options={{ title: "CartAdd" }}
        />
        <Stack.Screen
          name="IngredientList"
          component={IngredientList}
          options={{ title: "IngredientList" }}
        />
        <Stack.Screen
          name="RecipesList"
          component={RecipesList}
          options={({ navigation }) => ({ navigation })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
