import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from "@react-navigation/native";
export const BlogIcon = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.CreateButton} onPress={() =>
                navigation.navigate("HomeStack", {
                  screen: "BlogCreation",
                
                })
              }
        >
            <Icon name="edit" size={25} color='white' />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    CreateButton: {
        position: 'absolute',
        top: "90%",
        right: scale(10),
        backgroundColor: 'green',
        borderRadius: 50,
        padding: scale(5),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        width: "15%",
        height: "8%",
        justifyContent: "center",
        alignItems: "center",
    },
})