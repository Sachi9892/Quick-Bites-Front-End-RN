import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Image, FlatList, TouchableOpacity } from "react-native";

export default function Home({ navigation }) {

    const dishCategories = [
        { name: "Pizza", image: require("../../assets/images/pizza.jpeg") },
        { name: "Burger", image: require("../../assets/images/burger.jpeg") },
        { name: "Biryani", image: require("../../assets/images/birayani.jpeg") },
        { name: "Cake", image: require("../../assets/images/cake.jpeg") },
        { name: "Paratha", image: require("../../assets/images/paratha.png") },
        { name: "Paneer", image: require("../../assets/images/paneer.jpeg") },
        { name: "Momos", image: require("../../assets/images/momos.jpeg") },
        { name: "Thali", image: require("../../assets/images/thali.jpeg") },
    ];

    const nearbyRestaurants = [
        { id: "1", name: "Tadka Ustad", rating: 4.5, cost: 200, image: require("../../assets/images/pizza-hut.jpeg") },
        { id: "2", name: "Food adda", rating: 4.2, cost: 150, image: require("../../assets/images/dominos.png") },
        { id: "3", name: "Bandra Bistro", rating: 4.2, cost: 150, image: require("../../assets/images/bandra-bistro.png") },
    ];


    const handleCategoryPress = (categoryName) => {
        navigation.navigate('Search', {
            screen: 'SearchResultPage', // Specify the nested screen
            params: { query: categoryName }, // Pass the params
        });
    };

    const handleRestaurantPress = (restaurantName) => {

        navigation.navigate('Search', {
            screen: 'SearchResultPage', // Specify the nested screen
            params: { query: restaurantName }, // Pass the params
        });
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.title}>Quick Bites</Text>
                <Text style={styles.delivery}>Deliver to Vile Parle (W) ▼</Text>
            </View>

            {/* Search Bar */}
            <TouchableOpacity
                onPress={() => navigation.navigate("Search")}
                activeOpacity={1} // Ensures touch feedback is visible
            >
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for dishes or restaurants"
                    editable={false} // Prevents typing in this input
                />
            </TouchableOpacity>

            {/* Dish Categories */}
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.grid}>

                {dishCategories.map((dish, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.dishCard}
                        onPress={() => handleCategoryPress(dish.name)}
                    >
                        <Image source={dish.image} style={styles.dishImage} />
                        <Text style={styles.dishName}>{dish.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Nearby Restaurants */}
            <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
            <FlatList
                data={nearbyRestaurants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.restaurantCard}
                        onPress={() => handleRestaurantPress(item.name)}
                    >
                        <Image source={item.image} style={styles.restaurantImage} />
                        <View>
                            <Text style={styles.restaurantName}>{item.name}</Text>
                            <Text style={styles.restaurantDetails}>
                                ⭐ {item.rating} | ₹{item.cost}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
    },
    header: {
        marginVertical: 25,
        alignItems: "left",
    },
    title: {
        fontSize: 24,
        marginTop: 24,
        fontWeight: "bold",
    },
    delivery: {
        fontSize: 16,
        marginTop: 8,
        color: "gray",
    },
    searchBar: {
        borderWidth: 1,
        marginTop: 8,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    dishCard: {
        width: "22%",
        alignItems: "center",
        marginVertical: 10,
    },
    dishImage: {
        width: 80,
        height: 80,
        marginBottom: 5,
        borderRadius: 8,
    },
    dishName: {
        fontSize: 12,
        textAlign: "center",
    },
    restaurantCard: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 8,
    },
    restaurantImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 8,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    restaurantDetails: {
        fontSize: 12,
        color: "gray",
    },
});
