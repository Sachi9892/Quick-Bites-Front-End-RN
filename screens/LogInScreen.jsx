import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { BASE_URL } from "../constant/appconstant";
import { saveToken } from "../services/storage";

export default function LoginInScreen({ navigation }) {

    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const { login } = useContext(AuthContext); // Access login function

    const handleLogin = async () => {

        if (!mobile || !password) {
            Alert.alert("Error", "Please enter both mobile number and password.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                mobileNumber: mobile,
                password: password,
            });

            const token = response.data.token;
            console.log("Token is:", token);

            await saveToken(token); // Save the token to MMKV
            await login(token); // Update auth context

        } catch (error) {
            if (error.response && error.response.status === 404) {
                Alert.alert("User Not Found", "Please sign up to create an account.");
                navigation.navigate("SignUp");
            } else {
                Alert.alert("Error", "An error occurred during login.");
            }
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {/* Mobile Number Input */}
            <TextInput
                style={styles.input}
                placeholder="1234567890"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
            />

            {/* Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Login Button */}
            <Button
                title={isLoading ? "Logging in..." : "Login"}
                onPress={handleLogin}
                disabled={isLoading} // Disable button when loading
            />

            {/* Sign Up Link */}
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.link}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
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
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
    },
    link: {
        marginTop: 10,
        color: "blue",
    },
});