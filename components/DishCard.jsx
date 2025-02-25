import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DishCard = ({ item, onAddToCart, onSearch }) => {
    return (
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

                {/* Clickable Restaurant Name */}
                <TouchableOpacity onPress={() => onSearch(item.restName)}>
                    <Text style={styles.clickableText}>{item.restName}</Text>
                </TouchableOpacity>

                {/* Clickable Dish Category */}
                <TouchableOpacity onPress={() => onSearch(item.category)}>
                    <Text style={styles.clickableText}>{item.category}</Text>
                </TouchableOpacity>

                {/* Price */}
                <Text style={styles.dishPrice}>₹{item.price.toFixed(2)}</Text>

                {/* Add to Cart Button */}
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => onAddToCart(item)}
                >
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dishCard: {
        flexDirection: "row",
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        elevation: 3,
    },
    dishImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    dishDetails: {
        flex: 1,
        marginLeft: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    dishName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    dishTypeIcon: {
        marginLeft: 10,
    },
    dishRating: {
        marginLeft: 10,
        color: "#888",
    },
    clickableText: {
        color: "blue",
        marginTop: 5,
    },
    dishPrice: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5,
    },
    addToCartButton: {
        backgroundColor: "tomato",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
    },
    addToCartButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default DishCard;