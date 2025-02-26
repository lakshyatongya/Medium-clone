// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import Entypo from 'react-native-vector-icons/Entypo';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { scale, verticalScale,moderateScale } from 'react-native-size-matters';

// const BlogCreation = () => {
//   const { params } = useRoute();
//   const navigation = useNavigation();

//   const [title, setTitle] = useState(params?.title || '');
//   const [description, setDescription] = useState(params?.description || '');
//   const [images, setImages] = useState(params?.images || []);
//   const [userId, setUserId] = useState('');

//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const storedUserId = await AsyncStorage.getItem('userId');
//         if (storedUserId) {
//           setUserId(storedUserId);
//         } else {
//           Alert.alert('User ID is missing! Please log in first.');
//         }
//       } catch (error) {
//         Alert.alert('Error fetching userId');
//       }
//     };
//     fetchUserId();
//   }, []);

//   const handleImagePicker = () => {
//     launchImageLibrary({ mediaType: 'photo', multiple: true }, (response) => {
//       if (response.assets && response.assets.length > 0) {
//         const newImages = response.assets.map((asset, index) => ({
//           uri: asset.uri,
//           text: '',
//         }));
//         setImages([...images, ...newImages]);
//       }
//     });
//   };

//   const handleTextChange = (index, text) => {
//     const updatedImages = [...images];
//     updatedImages[index].text = text;
//     setImages(updatedImages);
//   };

//   const handlePreviewClick = () => {
//        if (!title || !description) {
//       Alert.alert('Title and description are required');
//       return;
//     }

//     if (images.length === 0) {
//       Alert.alert('Please add at least one image');
//       return;
//     }

    
//     navigation.navigate('PublishScreen', {
//       title: title,
//       description: description,
//       images: images,
//       userId: userId,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.topStyle}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Entypo name="cross" size={21} color={"gray"} />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.selectImageButton} onPress={handleImagePicker}>
//           <MaterialIcons name="add-photo-alternate" size={25} color={"gray"} />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.createBlogButton}
//           onPress={handlePreviewClick}
//         >
//           <Text style={styles.blogButtonText}>{params?.isEdit ? 'Save Changes' : 'Preview'}</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView>
//         <TextInput
//           value={title}
//           placeholder='Title'
//           onChangeText={setTitle}
//           style={styles.titleInput}
//           multiline
//           placeholderTextColor="gray"
//           maxLength={100}
//         />
//         <TextInput
//           value={description}
//           placeholder='Description'
//           onChangeText={setDescription}
//           multiline
//           placeholderTextColor="gray"
//           style={styles.descriptionInput}
//         />

//         {images.map((image, index) => (
//           <View key={index} style={styles.imageContainer}>
//             <Image source={{ uri: image.uri }} style={styles.imagePreview} />
//             <TextInput
//               value={image.text}
//               onChangeText={(text) => handleTextChange(index, text)}
//               placeholder={`Text for image ${index + 1}`}
//               style={styles.textBelowImage}
//               multiline
//             />
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: moderateScale(16), 
//     backgroundColor: 'black',
//   },
//   topStyle: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(10),
//   },
//   createBlogButton: {
//     backgroundColor: 'white',
//     width: moderateScale(120), 
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: moderateScale(10),
//     paddingVertical: moderateScale(5),
//   },
//   blogButtonText: {
//     color: 'black',
//     fontSize: moderateScale(12),  
//   },
//   titleInput: {
//     width: '100%',
//     color: 'white',
//     height: verticalScale(100),
//     borderColor: 'gray',
//     fontSize: moderateScale(18),
//     borderRadius: moderateScale(5),
//     textAlignVertical: 'top',
//     padding: moderateScale(10),  
//   },
//   descriptionInput: {
//     width: '100%',
//     color: 'white',
//     height: 'auto', 
//     maxHeight: verticalScale(200), 
//     borderColor: 'gray',
//     fontSize: moderateScale(15),
//     marginBottom: verticalScale(20),
//     borderRadius: moderateScale(5),
//     textAlignVertical: 'top',
//     padding: moderateScale(10),
//   },
//   selectImageButton: {
//     marginLeft: moderateScale(120),  
//     backgroundColor: 'black',
//     paddingVertical: moderateScale(10),
//     paddingHorizontal: moderateScale(20),
//     borderRadius: moderateScale(5),
//     alignSelf: 'flex-end',
//     alignItems: 'flex-end',
//   },
//   imagePreview: {
//     width: '90%',
//     height: verticalScale(200),
//     marginBottom: verticalScale(20),
//     borderRadius: moderateScale(10),
//     alignSelf: 'center',
//   },
//   textBelowImage: {
//     width: '90%',
//     color: 'white',
//     fontSize: moderateScale(16),  
//     marginBottom: verticalScale(20),
//     borderColor: 'gray',
//     borderRadius: moderateScale(5),
//     padding: moderateScale(10),
//   },
//   imageContainer: {
//     marginBottom: verticalScale(20),
//     alignItems: 'center',
//   },
// });

// export default BlogCreation;



import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle, setDescription, setImages, setUserId } from '../redux/actions/blogActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const BlogCreation = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { title, description, images, userId } = useSelector((state) => state.blog);  

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          dispatch(setUserId(storedUserId));
        } else {
          Alert.alert('User ID is missing! Please log in first.');
        }
      } catch (error) {
        Alert.alert('Error fetching userId');
      }
    };
    fetchUserId();
  }, [dispatch]);

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo', multiple: true }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const newImages = response.assets.map((asset) => ({
          uri: asset.uri,
          text: '',
        }));
        dispatch(setImages([...images, ...newImages]));
      }
    });
  };

  const handleTextChange = (index, text) => {
    const updatedImages = [...images];
    updatedImages[index].text = text;
    dispatch(setImages(updatedImages));
  };

  const handlePreviewClick = () => {
    if (!title || !description) {
      Alert.alert('Title and description are required');
      return;
    }

    if (images.length === 0) {
      Alert.alert('Please add at least one image');
      return;
    }

    navigation.navigate('PublishScreen', {
      title: title,
      description: description,
      images: images,
      userId: userId,
    });

    
    resetForm();
  };


  const resetForm = () => {
    dispatch(setTitle(''));
    dispatch(setDescription(''));
    dispatch(setImages([]));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="cross" size={21} color={'gray'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectImageButton} onPress={handleImagePicker}>
          <MaterialIcons name="add-photo-alternate" size={25} color={'gray'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.createBlogButton} onPress={handlePreviewClick}>
          <Text style={styles.blogButtonText}>
            {params?.isEdit ? 'Save Changes' : 'Preview'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <TextInput
          value={title}
          placeholder="Title"
          onChangeText={(text) => dispatch(setTitle(text))}
          style={styles.titleInput}
          multiline
          placeholderTextColor="gray"
          maxLength={100}
        />
        <TextInput
          value={description}
          placeholder="Description"
          onChangeText={(text) => dispatch(setDescription(text))}
          multiline
          placeholderTextColor="gray"
          style={styles.descriptionInput}
        />

        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image.uri }} style={styles.imagePreview} />
            <TextInput
              value={image.text}
              onChangeText={(text) => handleTextChange(index, text)}
              placeholder={`Text for image ${index + 1}`}
              style={styles.textBelowImage}
              multiline
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
    backgroundColor: 'black',
  },
  topStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  createBlogButton: {
    backgroundColor: 'white',
    width: moderateScale(120),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(5),
  },
  blogButtonText: {
    color: 'black',
    fontSize: moderateScale(12),
  },
  titleInput: {
    width: '100%',
    color: 'white',
    height: verticalScale(100),
    borderColor: 'gray',
    fontSize: moderateScale(18),
    borderRadius: moderateScale(5),
    textAlignVertical: 'top',
    padding: moderateScale(10),
  },
  descriptionInput: {
    width: '100%',
    color: 'white',
    height: 'auto',
    maxHeight: verticalScale(200),
    borderColor: 'gray',
    fontSize: moderateScale(15),
    marginBottom: verticalScale(20),
    borderRadius: moderateScale(5),
    textAlignVertical: 'top',
    padding: moderateScale(10),
  },
  selectImageButton: {
    marginLeft: moderateScale(120),
    backgroundColor: 'black',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(5),
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  imagePreview: {
    width: '90%',
    height: verticalScale(200),
    marginBottom: verticalScale(20),
    borderRadius: moderateScale(10),
    alignSelf: 'center',
  },
  textBelowImage: {
    width: '90%',
    color: 'white',
    fontSize: moderateScale(16),
    marginBottom: verticalScale(20),
    borderColor: 'gray',
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
  },
  imageContainer: {
    marginBottom: verticalScale(20),
    alignItems: 'center',
  },
});

export default BlogCreation;
