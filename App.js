import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import HomeScreen from "./src/ui/screens/home-screen";
import LoginScreen from "./src/ui/screens/login-screen";
import SetupScreen from "./src/ui/screens/setup-screen";
import SplashScreen from "./src/ui/screens/splash-screen";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    const Stack = createStackNavigator();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SetupScreen" component={SetupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </SafeAreaView>
    );
  }
}

export default App;
