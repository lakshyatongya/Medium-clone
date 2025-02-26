import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext'; 
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const SettingsScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  
  const handleLogout = async () => {
    try {
      
      Alert.alert(
        'Confirm Logout',
        'Are you sure you want to log out?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: async () => {
              await logout();
              // navigation.navigate('FirstScreen');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

       {user ? (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>Logged in as:</Text>
          <Text style={styles.userText}>{user}</Text>
        </View>
      ) : (
        <Text style={styles.userText}>You are not logged in.</Text>
      )}

     
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
  },
  userInfo: {
    marginBottom: verticalScale(20),
    alignItems: 'center',
  },
  userText: {
    fontSize: moderateScale(18),
    color: 'white',
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(5),
  },
  logoutText: {
    color: 'white',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
});


export default SettingsScreen;
