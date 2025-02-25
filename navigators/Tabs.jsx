import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";
import Home from "../screens/tabs/Home";
import ProfileDrawerNavigation from "./ProfileNavigator";
import SearchNavigator from "./SearchNavigator";
import CartPage from "../screens/tabs/CartPage";
import { fetchCart } from "../services/CartService";
import { CartContext } from "../context/CartContext";
import { Badge } from 'react-native-elements';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = async () => {
            try {
                const cart = await fetchCart();
                setCartCount(cart?.cartItems?.length || 0);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        updateCartCount();
    }, [cartCount]); // Update when cartCount changes


    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Home") iconName = focused ? "home" : "home-outline";
                    else if (route.name === "Search") iconName = focused ? "search" : "search-outline";
                    else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";

                    // Cart Icon with Badge
                    if (route.name === "Cart") {
                        return (
                            <View>
                                <Icon name={focused ? "cart" : "cart-outline"} size={size} color={color} />
                                {cartCount > 0 && (
                                    <View
                                        style={{
                                            position: "absolute",
                                            right: -5,
                                            top: -2,
                                            backgroundColor: "red",
                                            borderRadius: 10,
                                            width: 18,
                                            height: 18,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text style={{ color: "white", fontSize: 12 }}>{cartCount}</Text>
                                    </View>
                                )}
                            </View>
                        );
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Search" component={SearchNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="Cart" component={CartPage} />
            <Tab.Screen name="Profile" component={ProfileDrawerNavigation} />
        </Tab.Navigator>
    );
}
