import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

 const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); 
  
 
  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert('Please enter both email and password');
      return;
    }
  
    try {
      const response = await axios.post('http://10.0.2.2:3000/user/signin', { email, password });
      
      if (response.data.status === 'SUCCESS') {
        Alert.alert('Signin successful!');
        const { _id } = response.data.data;
        await AsyncStorage.setItem('userId', _id); 
        login(_id); 
        navigation.navigate('Home'); 
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred. Please try again.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back!</Text>
      <Text style={styles.subheading}>Sign in with your email and password</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="rgb(88, 88, 90)"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="rgb(88, 88, 90)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.signinButton} onPress={handleSignin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
    backgroundColor: 'black',
  },
  heading: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: moderateScale(30),
    textAlign: 'center',
    marginTop: verticalScale(30),
  },
  subheading: {
    fontSize: moderateScale(20),
    color: 'white',
    textAlign: 'center',
    marginTop: verticalScale(30),
  },
  input: {
    height: verticalScale(45),
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: verticalScale(12),
    marginTop: verticalScale(20),
    color: 'white',
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(8),
  },
  signinButton: {
    backgroundColor: 'green',
    width: '80%',
    justifyContent: 'center',
    height: verticalScale(45),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    marginLeft: '10%',
    marginTop: verticalScale(50),
  },
  buttonText: {
    color: 'white',
    fontSize: moderateScale(16),
  },
});



export default SigninScreen;


