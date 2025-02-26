import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
 const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
 const { login } = useAuth(); 

   const handleSignup = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/user/signup', {
        name,
        email,
        password,
      });
  
      console.log('Response Data:', response.data);  
  
      if (response.data.status === 'SUCCESS') {
        const { _id } = response.data.data;  
  
        if (_id) {
          await AsyncStorage.setItem('userId', _id);  
          navigation.navigate('VerifyOtp', { email });
        } else {
          console.error('User ID is missing:', response.data);  
          alert('User ID is missing in the response');
        }
      } else {
        alert(response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Medium</Text>
      <Text style={styles.subheading}>Create your account</Text>
      <Text style={styles.inputname}>Your full name</Text>
      <TextInput
        style={styles.input}
        placeholder="Input your full name"
        placeholderTextColor="rgb(88, 88, 90)"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.inputemail}>Your email</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="rgb(88, 88, 90)"
        placeholder="Input your email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.inputname}>Your password</Text>  
      <TextInput
        style={styles.input}
        placeholderTextColor="rgb(88, 88, 90)"
        placeholder="Input your password"
        secureTextEntry  
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.signupbutton} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: scale(1),
    padding: verticalScale(16),
    backgroundColor: 'black',
  },
  heading: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: scale(30),
    textAlign: 'center',
    marginTop: verticalScale(30),
  },
  subheading: {
    fontSize: scale(20),
    color: 'white',
    fontWeight: 'condensed',
    textAlign: 'center',
    marginTop: verticalScale(30),
  },
  input: {
    height: verticalScale(45),
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: scale(12),
    marginTop: verticalScale(5),
    color: 'white',
    borderRadius: 5,
  },
  inputname: {
    fontSize: scale(14),
    color: 'white',
    marginTop: verticalScale(20),
  },
  inputemail: {
    fontSize: scale(14),
    color: 'white',
    marginTop: verticalScale(20),
  },
  signupbutton: {
    backgroundColor: 'green',
    width: '80%',
    justifyContent: 'center',
    height: '6.5%',
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: scale(30),
    marginTop: verticalScale(50),
  },
  buttonText: {
    color: 'white',
    fontSize: scale(14),
  },
});
export default SignupScreen;

