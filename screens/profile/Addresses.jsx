import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

export default function MyAddresses({ navigation }) {
    return (
        <View style={styles.container}>
            <Button title='Toggle Drawer' onPress={() => navigation.toggleDrawer()} ></Button>
            <Button title='Order Page' onPress={() => navigation.jumpTo("Orders")} ></Button>
            <Text style={styles.text}>Address Page</Text>
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

