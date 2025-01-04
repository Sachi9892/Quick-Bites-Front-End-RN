import React from "react";
import {
    View,
    TextInput,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSearch } from "../../hooks/useSearch";

const SearchBoxWithAutoComplete = ({ navigation }) => {
    const { query, suggestions, handleInputChange } = useSearch();

    const handleSearch = () => {
        if (query.trim().length > 0) {
            navigation.navigate("SearchResultPage", { query });
        }
    };

    const handleSelectSuggestion = (selectedDish) => {
        navigation.navigate("SearchResultPage", { query: selectedDish.dishName });
    };

    return (
        <View style={styles.container}>
            {/* Search Input */}
            <View style={styles.searchBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for dishes..."
                    value={query}
                    onChangeText={handleInputChange}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
                    <Ionicons name="search" size={24} color="#555" />
                </TouchableOpacity>
            </View>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item) => item.dishId.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleSelectSuggestion(item)}
                                style={styles.suggestionItem}
                            >
                                <Text style={styles.suggestionText}>{item.dishName}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#f9f9f9",
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#fff",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        marginTop: 50,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    searchIcon: {
        marginLeft: 8,
    },
    suggestionsContainer: {
        marginTop: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        maxHeight: 200,
    },
    suggestionItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#f0f0f0",
    },
    suggestionText: {
        fontSize: 16,
        color: "#333",
    },
});

export default SearchBoxWithAutoComplete;
