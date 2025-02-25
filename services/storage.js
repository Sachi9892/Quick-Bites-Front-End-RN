import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

// Save JWT token
export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync("token", token); // Save the token securely
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// Retrieve JWT token
export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("token"); // Retrieve the token securely
    if (token) {
      console.log("Token retrieved successfully");
      return token;
    } else {
      console.log("No token found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// Remove JWT token (e.g., on logout)
export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync("token"); // Remove the token securely
    console.log("Token removed successfully");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

// Decode JWT token
export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
