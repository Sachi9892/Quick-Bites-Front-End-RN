import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const FoodCard = ({ name, rating, price, image }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.details}>
                    ★ {rating} | ₹{price}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 5,
    },
    image: { width: 80, height: 80, borderRadius: 5, marginRight: 10 },
    name: { fontSize: 16, fontWeight: "bold" },
    details: { fontSize: 14, color: "#666" },
});

export default FoodCard;
