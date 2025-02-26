import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import RazorpayCheckout from "react-native-razorpay";

import { fetchAddresses } from "../../services/AddressService"
import { placeOrder, generatePaymentSignature, verifyPayment } from "../../services/OrderNowService"

const CheckoutScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { cart, isScheduled } = route.params;
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        const loadAddresses = async () => {
            try {
                const addresses = await fetchAddresses();
                setSavedAddresses(addresses);
            } catch (error) {
                console.error("Error fetching saved addresses:", error);
            }
        };
        loadAddresses();
    }, []);

    const handlePaymentVerification = async (razorpayResponse) => {
        try {
            const verificationResult = await verifyPayment({
                orderId: razorpayResponse.razorpay_order_id,
                paymentId: razorpayResponse.razorpay_payment_id,
                signature: razorpayResponse.razorpay_signature,
            });

            if (verificationResult.success) {
                Alert.alert("Success", "Payment verified, order placed successfully!");
                navigation.navigate("OrderConfirmationScreen");
            } else {
                Alert.alert("Error", verificationResult.message || "Payment verification failed");
            }
        } catch (error) {
            Alert.alert("Error", "Payment verification failed. Please contact support.");
        }
    };

    const handlePlaceOrder = async (paymentMethod) => {
        if (!selectedAddress && !currentLocation) {
            Alert.alert("Error", "Please select an address or live location.");
            return;
        }

        const orderDetails = {
            cartId: cart.id,
            deliveryAddress: selectedAddress?.deliveryAddressId || currentLocation,
            orderType: isScheduled ?
                (paymentMethod === "COD" ? "SCHEDULE_COD" : "SCHEDULE_ONLINE") :
                (paymentMethod === "COD" ? "COD" : "ONLINE"),
            scheduledTime: isScheduled ? new Date().toISOString() : null,
        };

        if (paymentMethod === "COD") {
            try {
                await placeOrder(orderDetails);
                Alert.alert("Success", "Order placed successfully with Cash on Delivery.");
                navigation.navigate("OrderConfirmationScreen");
            } catch (error) {
                Alert.alert("Error", "Failed to place order. Please try again.");
            }
        } else {
            try {
                const orderResponse = await placeOrder(orderDetails);

                const options = {
                    key: "rzp_test_cWfbuLENrweRjB", // Should come from backend config
                    name: "Quick-Bites",
                    description: "Food Order Payment",
                    order_id: orderResponse.razorpayOrderId,
                    prefill: {
                        email: "customer@example.com", // Get from user profile
                        contact: "+919876543210",      // Get from user profile
                        name: "John Doe"               // Get from user profile
                    },
                    theme: { color: "#3399cc" },
                };

                RazorpayCheckout.open(options)
                    .then((razorpayResponse) => {
                        handlePaymentVerification(razorpayResponse);
                    })
                    .catch((error) => {
                        if (error.code !== 2) { // Ignore manual dismissals
                            Alert.alert("Payment Failed", error.description || "Payment cancelled by user");
                        }
                    });

            } catch (error) {
                Alert.alert("Error", "Failed to initiate payment. Please try again.");
            }
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Checkout</Text>

            <FlatList
                data={savedAddresses}
                keyExtractor={(item) => item.deliveryAddressId.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.addressItem,
                            selectedAddress?.deliveryAddressId === item.deliveryAddressId && styles.selected,
                        ]}
                        onPress={() => setSelectedAddress(item)}
                    >
                        <Text>{item.userAddress}</Text>
                    </TouchableOpacity>
                )}
            />

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(e) => setCurrentLocation(e.nativeEvent.coordinate)}
            >
                {currentLocation && <Marker coordinate={currentLocation} />}
            </MapView>

            <TouchableOpacity style={styles.codButton} onPress={() => handlePlaceOrder("COD")}>
                <Text style={styles.buttonText}>Pay on Delivery (COD)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.onlineButton} onPress={() => handlePlaceOrder("ONLINE")}>
                <Text style={styles.buttonText}>Pay Online</Text>
            </TouchableOpacity>
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
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    addressItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    selected: {
        backgroundColor: "#d3f8d3",
    },
    map: {
        height: 200,
        marginVertical: 20,
    },
    codButton: {
        backgroundColor: "#FFA500",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    onlineButton: {
        backgroundColor: "green",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CheckoutScreen;
