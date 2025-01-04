import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cart from "../screens/tabs/Cart";
import Home from "../screens/tabs/Home";
import ProfileDrawerNavigation from "./ProfileNavigator";
import Icon from "@expo/vector-icons/Ionicons";
import SearchNavigator from "./SearchNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Cart") {
                        iconName = focused ? "cart" : "cart-outline";
                    } else if (route.name === "Search") {
                        iconName = focused ? "search" : "search-outline";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false, // Home screen doesn't need a header
                }}
            />

            <Tab.Screen
                name="Search"
                component={SearchNavigator}
                options={{
                    headerShown: false, // Let SearchNavigator manage its own headers
                }}
            />

            <Tab.Screen name="Cart" component={Cart} />

            <Tab.Screen name="Profile" component={ProfileDrawerNavigation} />
        </Tab.Navigator>
    );
}
