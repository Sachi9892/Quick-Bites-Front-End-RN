import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CartModal = ({ visible, onClose, onIncrease, onDecrease, onViewCart, quantity }) => {
    return (
        <Modal transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Update Quantity</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={onDecrease}>
                            <MaterialCommunityIcons name="minus" size={30} color="tomato" />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity onPress={onIncrease}>
                            <MaterialCommunityIcons name="plus" size={30} color="tomato" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.viewCartButton} onPress={onViewCart}>
                        <Text style={styles.viewCartButtonText}>View Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    quantityText: {
        fontSize: 20,
        marginHorizontal: 20,
    },
    viewCartButton: {
        backgroundColor: "tomato",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    viewCartButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default CartModal;
