import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TextInput, Text, StyleSheet, TouchableOpacity ,Button} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useAuth } from '../context/AuthContext';

export const VerifyOtpScreen = ({ route, navigation }) => {
  const [otp, setOtp] = useState('');
  const { email } = route.params; 
 const { login } = useAuth(); 
  const handleValidateOtp = async () => {
    if (!otp) {
      alert('Please enter the OTP');
      return;
    }

    try {
      console.log("email------------", email);
      console.log("otp----------------", otp);


      const response = await axios.post('http://10.0.2.2:3000/user/verifyOtp', {
        email,
        otp: Number(otp), 
      });

      if (response.data.status === 'SUCCESS' && response.data.data && response.data.data._id) {
        const { _id } = response.data.data;
        await AsyncStorage.setItem('userId', _id);
        login(_id);
        navigation.navigate('Home');
      } else {
        alert('Invalid response data or missing _id');
      }
      

    } catch (error) {
      console.error(error);
      alert('An error occurred while validating the OTP. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:"black" }}>
      <TextInput
        style={{
          color:"white",
          height: 50,
          borderColor: 'white',
          borderWidth: 1,
          width: '80%',
          marginBottom: 20,
          textAlign: 'center',}}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        placeholderTextColor={"white"}
      />
      <Button title="Verify OTP" onPress={handleValidateOtp} />
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
    fontSize: scale(20),
    textAlign: 'center',
    marginTop: verticalScale(50),
  },
  subheading: {
    color: 'white',
    fontSize: verticalScale(13),
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
  input: {
    borderRadius: 10,
    height: verticalScale(44),
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: verticalScale(100),
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(8),
    color: 'white',
  },
  validatebutton: {
    backgroundColor: 'white',
    width: '80%',
    justifyContent: 'center',
    height: '6%',
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: scale(30),
    marginTop: verticalScale(50),
  },
  buttonText: {
    color: 'black',
  },
});


export default VerifyOtpScreen
