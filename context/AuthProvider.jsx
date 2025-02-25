import React, { createContext, useState, useEffect } from "react";
import { getToken, saveToken, removeToken } from "../services/storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await getToken(); // Get the token from SecureStore
                setIsLoggedIn(!!token); // Convert token presence to boolean
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false); // Assume user is not logged in if there's an error
            }
        };

        checkLoginStatus();
    }, []);

    const login = async (token) => {
        try {
            await saveToken(token); // Save the token to SecureStore
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const logout = async () => {
        try {
            await removeToken(); // Remove the token from SecureStore
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}