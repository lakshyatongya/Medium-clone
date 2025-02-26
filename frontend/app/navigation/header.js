
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HeaderScreen = () => {
  return (
    <View style={styles.container}>
       <ScrollView horizontal style={styles.categoriesContainer}>
    <Text style={styles.title}>For you</Text>
    <Text style={styles.title}>Following</Text>
    <Text style={styles.title}>Technology</Text>
    <Text style={styles.title}>Data Science</Text>
    
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: 'black',
    flexDirection:"row",
    paddingTop: 20,
    borderBottomWidth:0.3,
    borderBottomColor: 'gray',
  },
  title: {
    fontSize: 16,
    fontWeight: "condensed",
    color: 'white',
    margin:10,
   
  },
});

export default HeaderScreen;
