import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./context/AuthProvider";
import TabNavigator from "./navigators/Tabs";
import AuthStack from "./navigators/AuthStack";
import { CartProvider } from "./context/CartContext";

function AppNavigator() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <CartProvider>
      <NavigationContainer>
      {isLoggedIn ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
    </CartProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
