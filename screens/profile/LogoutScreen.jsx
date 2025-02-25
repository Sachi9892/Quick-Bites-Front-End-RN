import React, { useContext } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthProvider";
import { removeToken } from "../../services/storage";

export default function LogoutScreen({ navigation }) {

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout", onPress: () => {

                        removeToken();
                        logout();
                        navigation.navigate("Login");
                    }
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Logout</Text>
            <Text style={styles.subtitle}>Are you sure you want to log out?</Text>
            <Button title="Logout" onPress={handleLogout} color="tomato" />
            <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: "gray",
    },
});
