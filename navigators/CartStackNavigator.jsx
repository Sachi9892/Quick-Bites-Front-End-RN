import { createStackNavigator } from "@react-navigation/stack";
import CartPage from "../screens/tabs/CartPage";
import CheckoutScreen from "../screens/tabs/CheckoutScreen";

const Stack = createStackNavigator();

const CartStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false // Hide default header
            }}
        >
            <Stack.Screen
                name="CartPage"
                component={CartPage}
                options={{ title: "Cart" }}
            />
            <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{
                    title: "Checkout",
                    headerShown: true,  // Show header only for Checkout
                    headerBackTitle: "Back"
                }}
            />
        </Stack.Navigator>
    );
};


export default CartStackNavigator;
