import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";

import { BASE_URL } from "../constant/appconstant";

export default function SignUpScreen({ navigation }) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/signup`, {
                userEmail: email,
                password: password,
                userMobileNumber: mobileNumber,
                address: address,
            });

            const token = response.data.token;
            console.log("Token is:", token);

            await saveToken(token); // Save the token to MMKV
            // If sign-up is successful, navigate to the login screen
            Alert.alert("Success", "Account created successfully. Please log in.");
            navigation.navigate("Login");
        } catch (error) {
            Alert.alert("Error", "An error occurred during sign-up.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
            <TextInput style={styles.input} placeholder="Mobile Number" value={mobileNumber} onChangeText={setMobileNumber} />
            <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
            <Button title="Sign Up" onPress={handleSignUp} />
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Already have an account? Login</Text>
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