import React from "react";
import { View, Text, Button, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/core";

const WelcomeScreen = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.root}>
            <Text style={styles.welcome}> Welcome to PokeSearch </Text>
                {/* <Button color="#0a369d" title="Get started"  onPress={() => navigation.navigate('home')} /> */}
                <TouchableOpacity style={styles.btncontainer} onPress={() => navigation.navigate('home')} >
                    <Text style={styles.button} > Get Started </Text>
                </TouchableOpacity>
        </View>
    )

}

export default WelcomeScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CFDEE7'
    },
    welcome: {
        marginBottom: 20,
        fontSize: 25,
        fontFamily: 'MonsBold'
    },
    btncontainer: {
        backgroundColor: '#0a369d',
        borderRadius: 25,
        paddingHorizontal: 5,
    },
    button: {
        // backgroundColor: '#0a369d',
        padding: 10,
        color: 'white',
        fontFamily: 'MonsReg'
    }
})