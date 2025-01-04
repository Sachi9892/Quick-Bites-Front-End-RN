import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Alert
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SearchResultPage = ({ route }) => {
    const { query } = route.params; // Retrieve the search query
    const [results, setResults] = useState([]); // Store search results
    const [loading, setLoading] = useState(true); // Show loading spinner

    // Fetch search results based on the query
    const fetchSearchResults = async () => {
        try {
            const endpoint = `http://192.168.1.102:8081/user/search?query=${query}`;
            const response = await axios.get(endpoint);
            console.log("Response for query:", query, ":", response.data);
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

    // Render each dish card
    const renderDishCard = ({ item }) => (
        <View style={styles.dishCard}>
            <Image source={{ uri: item.dishPic }} style={styles.dishImage} />
            <View style={styles.dishDetails}>
                {/* Dish Name with Type and Rating */}
                <View style={styles.row}>
                    <Text style={styles.dishName}>{item.dishName}</Text>
                    <MaterialCommunityIcons
                        name={item.dishType === "VEG" ? "leaf" : "food-drumstick"}
                        size={25}
                        color={item.dishType === "VEG" ? "green" : "red"}
                        style={styles.dishTypeIcon}
                    />
                    <Text style={styles.dishRating}>
                        ⭐ {item.avgReview} ({item.totalReviews})
                    </Text>
                </View>

                {/* Dish Category */}
                <Text style={styles.dishCategory}>{item.category}</Text>

                {/* Price */}
                <Text style={styles.dishPrice}>₹{item.price.toFixed(2)}</Text>

                {/* Add to Cart Button */}
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => handleAddToCart(item)}
                >
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );


    // Handle adding item to cart
    const handleAddToCart = (dish) => {
        Alert.alert("Dish Added Into Cart");
        console.log(`${dish.dishName} added to cart!`);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : results.length > 0 ? (
                <>
                    <Text style={styles.heading}>Search Results for "{query}"</Text>
                    <FlatList
                        data={results}
                        keyExtractor={(item) => item.dishId.toString()}
                        renderItem={renderDishCard}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </>
            ) : (
                <Text style={styles.noResults}>
                    No results found for "{query}".
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 16,
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    flatListContainer: {
        paddingBottom: 20,
    },
    dishCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 6,
        marginBottom: 16,
        overflow: "hidden",
    },
    dishImage: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
    dishDetails: {
        padding: 16,
    },
    dishName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    dishCategory: {
        fontSize: 14,
        color: "#777",
        marginVertical: 4,
        marginTop: 16
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dishTypeIcon: {

    },
    dishRating: {
        fontSize: 17,
        color: "#555",
    },
    dishPrice: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginVertical: 8,
    },
    addToCartButton: {
        marginTop: 16,
        backgroundColor: "#FF6347",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    addToCartButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    noResults: {
        fontSize: 16,
        textAlign: "center",
        color: "#888",
    },
});

export default SearchResultPage;
