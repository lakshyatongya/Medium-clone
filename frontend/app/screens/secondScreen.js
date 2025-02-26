import React from "react";
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

 const SecondScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Medium</Text>
            <Text style={styles.subheading}>Human stories and ideas.</Text>
            <Text style={styles.title}>Discover perspectives that deepen understanding.</Text>
            
            <TouchableOpacity style={styles.googlebutton} onPress={() => navigation.navigate("signinwithgoogle")}>
                <View style={styles.googleButtonContainer}>
                    <FontAwesomeIcon name="google" size={25} color="red" style={styles.googleicon} />
                    <Text style={styles.googleButtonText}>Sign in with Google</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Signupbutton} onPress={() => navigation.navigate("Signin")} >
                <View style={styles.emailButtonContainer}>
                    <FontistoIcon name="email" size={25} color="white" style={styles.Emailicon} />
                    <Text style={styles.signupButtonText}>Sign in with Email</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("FirstScreen")}>
                <Text style={{ color: 'white', marginTop: scale(10), textAlign: "center", fontSize: scale(14) }}>
                    Don't have an account?{' '}
                    <Text style={{ color: 'green' }}>Sign up</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: scale(1),
        padding: scale(16),
        backgroundColor: "black"
    },
    heading: {
        fontWeight: "bold",
        color: "white",
        fontSize: scale(30),
        textAlign: "center",
        marginTop: verticalScale(30),
    },
    subheading: {
        fontSize: scale(55),
        color: "white",
        fontWeight: "condensed",
        textAlign: "center",
        marginTop: verticalScale(20),
    },
    title: {
        fontSize: scale(13),
        color: "white",
        marginTop: verticalScale(10),
    },
    googlebutton: {
        marginTop: verticalScale(50),
        borderRadius: scale(30),
        borderColor: 'white',
        borderWidth: 1,
        height: verticalScale(40),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    googleButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    googleButtonText: {
        color: 'white',
        textAlign: 'center',
        marginLeft: scale(10),
        fontSize: scale(15),
    },
    googleicon: {
        marginLeft: scale(10),
    },
    Signupbutton: {
        marginTop: verticalScale(20),
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
        height: verticalScale(40),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    signupButtonText: {
        color: 'white',
        textAlign: 'center',
        marginLeft: scale(10),
        fontSize: scale(15),
    },
    emailButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Emailicon: {
        marginLeft: scale(10),
    },
});

export default SecondScreen