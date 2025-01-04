import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function OrderHistory() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Order History Page</Text>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold',
        margin: 40
    }
})


