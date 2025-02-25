import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import CartModal from "../../modal/CartModal";
import { BASE_URL } from "../../constant/appconstant";
import { fetchCart, addToCart, removeFromCart } from "../../services/CartService";
import DishCard from "../../components/DishCard";
import SearchResultsHeader from "../../components/SearchResultHeader";
import NoResults from "../../components/NoResult";
import LoadingIndicator from "../../components/LoadinIndicator";

const SearchResultPage = ({ route }) => {

    const { query } = route.params; // Retrieve the search query
    const [results, setResults] = useState([]); // Store search results
    const [loading, setLoading] = useState(true); // Show loading spinner
    const [cartModalVisible, setCartModalVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [selectedDish, setSelectedDish] = useState(null); // Track the selected dish for modal
    const navigation = useNavigation();

    // Fetch search results based on the query
    const fetchSearchResults = async () => {
        try {
            const endpoint = `${BASE_URL}/search?query=${query}`;
            const response = await axios.get(endpoint);
            setResults(response.data || []); // Store the results
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false); // Stop loading after fetching
        }
    };

    useEffect(() => {
        fetchSearchResults(); // Fetch the results on component mount
    }, [query]); // Re-fetch if query changes

    // Handle navigation to search results
    const handleSearch = (newQuery) => {
        navigation.navigate("SearchResultPage", { query: newQuery });
    };


    // Handle adding a dish to the cart
    const handleAddToCart = async (dish) => {
        try {
            await addToCart(dish.dishId);
            const updatedCart = await fetchCart();
            const updatedDish = updatedCart.cartItems.find((item) => item.dishId === dish.dishId) || { ...dish, quantity: 1 };
            setSelectedDish(updatedDish);
            setCartItems(updatedCart);
            setCartModalVisible(true);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                // Show API error message
                alert(error.response.data.message);
            } else {
                // Fallback error
                alert("Error adding to cart. Please try again.");
            }
        }
    };


    const handleIncreaseQuantity = async () => {
        if (selectedDish) {
            await addToCart(selectedDish.dishId);
            const updatedCart = await fetchCart();
            setCartItems(updatedCart);
            setSelectedDish((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
        }
    };

    const handleDecreaseQuantity = async () => {
        if (selectedDish && selectedDish.quantity > 1) {
            await removeFromCart(selectedDish.dishId);
            const updatedCart = await fetchCart();
            setCartItems(updatedCart);
            setSelectedDish((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
        }
    };



    return (
        <View style={styles.container}>
            {loading ? (
                <LoadingIndicator />
            ) : results.length > 0 ? (
                <>
                    <SearchResultsHeader query={query} />
                    <FlatList
                        data={results}
                        keyExtractor={(item) => item.dishId.toString()}
                        renderItem={({ item }) => (
                            <DishCard
                                item={item}
                                onAddToCart={handleAddToCart}
                                onSearch={handleSearch}
                            />
                        )}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </>
            ) : (
                <NoResults query={query} />
            )}

            {/* Cart Modal */}
            // Update the CartModal usage in SearchResultPage.js
            <CartModal
                visible={cartModalVisible}
                onClose={() => {
                    fetchCart().then((updatedCart) => setCartItems(updatedCart));
                    setCartModalVisible(false);
                }}
                quantity={selectedDish?.quantity ?? 1}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
                onViewCart={() => {
                    setCartModalVisible(false); // Close modal first
                    navigation.navigate("Cart"); // Navigate to Cart tab
                }}
            />



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    flatListContainer: {
        paddingBottom: 20,
    },
});

export default SearchResultPage;