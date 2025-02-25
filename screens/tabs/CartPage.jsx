import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { fetchCart, clearCart } from "../../services/CartService";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
    const { cartCount, setCartCount } = useCart();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const cartData = await fetchCart();
                setCart(cartData);
                setCartCount(cartData?.cartItems.length || 0);
            } catch (error) {
                console.error("Error fetching cart:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, [cartCount]); // Refresh when cartCount changes

    if (loading) return <Text>Loading...</Text>;
    if (!cart || cart.cartItems.length === 0) return <Text>Your cart is empty.</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Cart</Text>

            <FlatList
                data={cart.cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image source={{ uri: item.dishPic }} style={styles.image} />
                        <View style={styles.details}>
                            <Text style={styles.name}>{item.dishName}</Text>
                            <Text style={styles.type}>{item.dishType}</Text>
                            <Text style={styles.price}>₹{item.price} x {item.quantity}</Text>
                        </View>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <Text style={styles.total}>Total Amount: ₹{cart.totalAmount}</Text>
                <Text style={styles.total}>Total Dishes: {cart.totalDishes}</Text>

                {/* Clear Cart Button */}
                <TouchableOpacity style={styles.clearCartButton} onPress={() => clearCart(setCart, setCartCount)}>
                    <Text style={styles.buttonText}>Clear Cart</Text>
                </TouchableOpacity>

                {/* Order Now Button */}
                <TouchableOpacity style={styles.orderNowButton}>
                    <Text style={styles.buttonText}>Order Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    cartItem: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    details: {
        marginLeft: 10,
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    type: {
        color: "gray",
    },
    price: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: "bold",
    },
    footer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#f8f8f8",
        borderRadius: 5,
        alignItems: "center",
    },
    total: {
        fontSize: 18,
        fontWeight: "bold",
    },
    clearCartButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: "100%",
        alignItems: "center",
    },
    orderNowButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CartPage;
