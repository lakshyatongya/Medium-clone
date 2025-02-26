import React from "react";
import { StyleSheet, Text, View } from "react-native";
  const SearchScreen=()=>{


    return(
         <View style={styles.container}>

          <Text style={styles.search}>Search screeen</Text>
         </View>
    )
    }
    export default SearchScreen;
    const styles=StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "black",
            padding:1,
          },
          search:{
            color:"white" ,
            fontSize:30,
            fontWeight:"bold",
            alignSelf:"center",
           marginTop:50
          }
    })
