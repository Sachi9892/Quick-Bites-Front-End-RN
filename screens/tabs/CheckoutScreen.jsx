import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

import { fetchAddresses } from "../../services/AddressService";

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

    const handlePlaceOrder = () => {
        const orderDetails = {
            cartId: cart.id,
            deliveryAddress: selectedAddress?.deliveryAddressId || currentLocation,
            orderType: isScheduled ? "SCHEDULE_ONLINE" : "ONLINE",
            scheduledTime: isScheduled ? new Date().toISOString() : null,
        };
        console.log("Placing Order:", orderDetails);
        // Call API to place order
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Checkout</Text>

            {/* Saved Addresses */}
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

            {/* Live Location Selection */}
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

            {/* Place Order Button */}
            <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
                <Text style={styles.buttonText}>Place Order</Text>
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
    orderButton: {
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
