import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LottieView from 'lottie-react-native';

const PublishScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { title, description, images, userId } = params;
  const [loading, setLoading] = useState(false);

  const handlePublishNow = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    images.forEach((image, index) => {
      const imageUri = image.uri;
      const fileName = imageUri.split('/').pop();
      const fileType = imageUri.split('.').pop();
      formData.append('images', {
        uri: imageUri,
        name: fileName,
        type: `image/${fileType}`,
      });

      formData.append(`caption${index}`, image.text || '');
    });

    try {
      const response = await axios.post(
        `http://10.0.2.2:3000/blog/${userId}/create`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 5000,
        }
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Blog published successfully!');
        navigation.reset({
          routes: [
            {
              name: 'HomeStack', 
              params: {
                screen: 'ProfileScreen',
              },
            },
          ],
        });
      } else {
        Alert.alert('Failed to publish blog');
      }
    } catch (error) {
      console.error('Error publishing blog:', error);
      Alert.alert('An error occurred while publishing the blog');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Story Preview</Text>
      <Text style={styles.subtext}>
        This is how your story will be shown to readers in public places, like Medium’s homepage and subscribers’ inboxes.
      </Text>

      <View style={styles.storyCard}>
        <Text style={styles.storyAuthor}>{userId}</Text>
        <Text style={styles.storyTitle}>{title}</Text>
        <Text style={styles.subtitle}>Your story subtitle</Text>
        <TouchableOpacity>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require('../assets/animations/Animation - 1740390339541.json')}
            autoPlay
            loop
            style={styles.loadingAnimation}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.buttonContainer, loading && styles.disabledButton]}
          onPress={handlePublishNow}
          disabled={loading} 
        >
          <Text style={styles.buttontext}>Publish Now</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: moderateScale(20),
  },
  header: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: verticalScale(10),
  },
  subtext: {
    fontSize: moderateScale(14),
    color: '#bbb',
    marginBottom: verticalScale(20),
  },
  storyCard: {
    backgroundColor: '#1e1e1e',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
  },
  storyAuthor: {
    color: '#aaa',
    fontSize: moderateScale(13),
  },
  storyTitle: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginTop: verticalScale(5),
  },
  subtitle: {
    marginTop: verticalScale(15),
    fontSize: moderateScale(12),
    color: '#bbb',
  },
  editText: {
    color: '#4ba3f5',
    fontSize: moderateScale(14),
    marginTop: verticalScale(10),
    alignSelf: "flex-end",
  },
  buttonContainer: {
    marginTop: verticalScale(30),
    backgroundColor: 'white',
    height: verticalScale(40),
    width: '70%',
    borderRadius: moderateScale(15),
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(30),
  },
  disabledButton: {
    backgroundColor: '#d3d3d3', 
  },
  buttontext: {
    color: 'black',
    alignSelf: 'center',
    fontSize: moderateScale(14),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(300),
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
});

export default PublishScreen;
