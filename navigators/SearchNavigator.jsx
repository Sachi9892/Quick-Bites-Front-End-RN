import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import SearchBoxWithAutoComplete from "../screens/tabs/SearchWithAutoComplete";
import SearchResultPage from "../screens/tabs/SearchResultPage";
import CartStackNavigator from "./CartStackNavigator";

const Stack = createStackNavigator();

const SearchNavigator = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SearchBoxWithAutoComplete"
                component={SearchBoxWithAutoComplete}
                options={{ headerTitle: "Search", headerShown: true }}
            />
            <Stack.Screen
                name="SearchResultPage"
                component={SearchResultPage}
                options={({ route, navigation }) => ({
                    headerTitle: `Results for "${route.params?.query}"`,
                    headerShown: true,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("SearchBoxWithAutoComplete")}>
                            <Ionicons name="search" size={24} color="tomato" style={{ marginRight: 16 }} />
                        </TouchableOpacity>
                    ),
                })}
            />

            <Stack.Screen name="Cart" component={CartStackNavigator} />


        </Stack.Navigator>
    );
};

export default SearchNavigator;