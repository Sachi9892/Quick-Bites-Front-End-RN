import React from "react";
import { Text, StyleSheet } from "react-native";

const SearchResultsHeader = ({ query }) => {
    return <Text style={styles.heading}>Search Results for "{query}"</Text>;
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default SearchResultsHeader;