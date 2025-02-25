import axios from "axios";
import { BASE_URL } from "../constant/appconstant";
import { getToken } from "./storage"; // Import getToken

// Fetch user's cart
export const fetchCart = async () => {
  try {
    const token = await getToken(); // Get the token from SecureStore
    const response = await axios.get(`${BASE_URL}/cart/view`, {
      headers: {
        Authorization: `Bearer ${token}`, // Use the token from SecureStore
      },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Add to cart
export const addToCart = async (dishId) => {
  try {
    const token = await getToken();
    console.log("Token retrieved successfully");
    console.log("Adding dish:", dishId);

    const response = await axios.post(
      `${BASE_URL}/cart/add`,
      { dishId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Add to cart response:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to add to cart.";
      console.error("Error message:", errorMessage);

      if (
        errorMessage.includes(
          "You cannot add dishes from multiple restaurants."
        )
      ) {
        throw new Error("You can only order from one restaurant at a time.");
      }
    }
    throw error;
  }
};

// Remove a dish from the cart
export const removeFromCart = async (dishId) => {
  try {
    const token = await getToken(); // Get the token from SecureStore
    await axios.delete(`${BASE_URL}/cart/remove`, {
      data: { dishId }, // Only dishId is needed; userId is extracted from the token
      headers: {
        Authorization: `Bearer ${token}`, // Use the token from SecureStore
      },
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

// Clear the cart and update state
export const clearCart = async (setCart, setCartCount) => {
  try {
    const token = await getToken();
    await axios.delete(`${BASE_URL}/cart/clear`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Update cart state and badge count
    setCart(null);
    setCartCount(0);
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};
