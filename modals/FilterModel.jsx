import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Slider from '@react-native-community/slider';

const FilterModal = ({ visible, onClose, onApply }) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);
    const [minRating, setMinRating] = useState(0);
    const [minDistance, setMinDistance] = useState(0);
    const [maxDistance, setMaxDistance] = useState(5);
    const [dishType, setDishType] = useState("ALL");
    const [sortBy, setSortBy] = useState("relevance");
    const [ascending, setAscending] = useState(true);

    const applyFilters = () => {
        onApply({
            minPrice,
            maxPrice,
            minRating,
            minDistance,
            maxDistance,
            dishType,
            sortBy,
            ascending,
        });
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <Text style={styles.heading}>Filters</Text>

                {/* Price Range Slider */}
                <Text style={styles.sectionHeading}>Price Range (₹)</Text>
                <View style={styles.sliderContainer}>
                    <Text>₹{minPrice}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1000}
                        step={50}
                        value={minPrice}
                        onValueChange={(value) => setMinPrice(value)}
                    />
                    <Slider
                        style={styles.slider}
                        minimumValue={minPrice}
                        maximumValue={1000}
                        step={50}
                        value={maxPrice}
                        onValueChange={(value) => setMaxPrice(value)}
                    />
                    <Text>₹{maxPrice}</Text>
                </View>

                {/* Rating Filter */}
                <Text style={styles.sectionHeading}>Minimum Rating</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5}
                    step={0.5}
                    value={minRating}
                    onValueChange={(value) => setMinRating(value)}
                />
                <Text>{minRating} stars</Text>

                {/* Distance Filter */}
                <Text style={styles.sectionHeading}>Delivery Distance (km)</Text>
                <View style={styles.sliderContainer}>
                    <Text>{minDistance} km</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={20}
                        step={1}
                        value={minDistance}
                        onValueChange={(value) => setMinDistance(value)}
                    />
                    <Slider
                        style={styles.slider}
                        minimumValue={minDistance}
                        maximumValue={20}
                        step={1}
                        value={maxDistance}
                        onValueChange={(value) => setMaxDistance(value)}
                    />
                    <Text>{maxDistance} km</Text>
                </View>

                {/* Dish Type Filter */}
                <Text style={styles.sectionHeading}>Dish Type</Text>
                <RadioButton.Group
                    onValueChange={(value) => setDishType(value)}
                    value={dishType}
                >
                    <View style={styles.radioGroup}>
                        <RadioButton value="ALL" />
                        <Text>All</Text>
                    </View>
                    <View style={styles.radioGroup}>
                        <RadioButton value="VEG" />
                        <Text>Veg</Text>
                    </View>
                    <View style={styles.radioGroup}>
                        <RadioButton value="NON_VEG" />
                        <Text>Non-Veg</Text>
                    </View>
                </RadioButton.Group>

                {/* Sort By */}
                <Text style={styles.sectionHeading}>Sort By</Text>
                <RadioButton.Group
                    onValueChange={(value) => setSortBy(value)}
                    value={sortBy}
                >
                    <View style={styles.radioGroup}>
                        <RadioButton value="relevance" />
                        <Text>Relevance</Text>
                    </View>
                    <View style={styles.radioGroup}>
                        <RadioButton value="distance" />
                        <Text>Distance</Text>
                    </View>
                    <View style={styles.radioGroup}>
                        <RadioButton value="rating" />
                        <Text>Rating</Text>
                    </View>
                    <View style={styles.radioGroup}>
                        <RadioButton value="cost" />
                        <Text>Cost</Text>
                    </View>
                </RadioButton.Group>

                {/* Sort Order */}
                <Text style={styles.sectionHeading}>Sort Order</Text>
                <RadioButton.Group
                    onValueChange={(value) => setAscending(value === "true")}
                    value={ascending.toString()}
                >
                    <View style={styles.radioGroup}>
                        <RadioButton value="true" />
                        <Text>Ascending</Text>
                    </View>
                    <View style={styles.radioGroup}>
                        <RadioButton value="false" />
                        <Text>Descending</Text>
                    </View>
                </RadioButton.Group>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={onClose}
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={applyFilters}
                    >
                        <Text style={{ color: "white" }}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    // Styles here (similar to previous examples)
    modalContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginTop: "auto",
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    sectionHeading: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10,
    },
    slider: { width: "80%", marginVertical: 10 },
    radioGroup: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
    buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
    clearButton: { padding: 10, backgroundColor: "#f0f0f0", borderRadius: 8 },
    applyButton: { padding: 10, backgroundColor: "#FF6347", borderRadius: 8 },
});

export default FilterModal;
