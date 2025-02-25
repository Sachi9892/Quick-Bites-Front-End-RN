import React from "react";
import { Text, StyleSheet } from "react-native";

const NoResults = ({ query }) => {
    return <Text style={styles.noResults}>No results found for "{query}".</Text>;
};

const styles = StyleSheet.create({
    noResults: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
    },
});

export default NoResults;