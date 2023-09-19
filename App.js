import "react-native-gesture-handler";
import { View, StyleSheet, Text } from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./Screens/RegistrationScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto500: require("./assets/fonts/Roboto-Medium.ttf"),
    Roboto400: require("./assets/fonts/Roboto-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: null, headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: null, headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
