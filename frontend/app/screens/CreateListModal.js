
// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
// import { scale } from "react-native-size-matters";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from "axios";
// import { useNavigation } from '@react-navigation/native';
// const CreateListModal = ({ visible, onClose }) => {
//   const [listName, setListName] = useState("");
//   const [description, setDescription] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(false); 
//   const navigation = useNavigation();
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

//   const handleCreateList = async () => {
//     if (!userId) {
//       Alert.alert('User ID is missing! Please log in first.');
//       return;
//     }
//     if (listName.length > 60) {
//       Alert.alert('List name cannot be longer than 60 characters.');
//       return;
//     }
//     if(!description.length>280){
//       Alert.alert('list description cannot be longer than 280 characters.')
//     }
//     if (!listName) {
//       Alert.alert('Please enter a list name.');
//       return;
//     }

//     setLoading(true); 

//     try {
//       const response = await axios.post('http://10.0.2.2:3000/lists/createlists', {
//         listname: listName,
//         description,
//         userId,
//       });

//       setLoading(false); 

//       if (response.status === 201) {
//         console.log("List created successfully:", response.data);
//         // Alert.alert('Success', 'List created successfully.');
//         navigation.goBack();
        
//       } else {
//         console.error("Error creating list:", response.data.error);
//         Alert.alert("Error", "There was an issue creating the list.");
//       }
//     } catch (error) {
//       setLoading(false); 
//       console.error("Error:", error);
//       Alert.alert("Error", "An error occurred while creating the list.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Create new list</Text>

//       <Text style={styles.label}>List name</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Add a name"
//         placeholderTextColor="#666"
//         value={listName}
//         onChangeText={setListName}
//         maxLength={60}
//       />
// <Text style={styles.charCount}>{listName.length}/60</Text>
//       <Text style={styles.label}>Description (optional)</Text>
//       <TextInput
//         style={[styles.input, styles.description]}
//         placeholder="Add a description"
//         placeholderTextColor="#666"
//         value={description}
//         onChangeText={setDescription}
//         maxLength={280}
//         multiline
//       />
// <Text style={styles.charCount}>{description.length}/280</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#fff" style={styles.loader} />
//       ) : (
//         <TouchableOpacity style={styles.createButton} onPress={handleCreateList}>
//           <Text style={styles.createButtonText}>Create</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: scale(20),
//     backgroundColor: "black",
//   },
//   header: {
//     fontSize: scale(20),
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: scale(10),
//   },
//   label: {
//     fontSize: scale(14),
//     color: "#fff",
//     marginTop: scale(40),
//   },
//   input: {
//     backgroundColor: "#222",
//     color: "#fff",
//     padding: scale(10),
//     borderRadius: scale(5),
//     marginTop: scale(5),
//   },
//   description: {
//     height: scale(80),
//     textAlignVertical: "top",
//   },
//   createButton: {
//     backgroundColor: "green",
//     padding: scale(8),
//     alignItems: "center",
//     borderRadius: scale(5),
//     marginTop: scale(50),
//     width: "60%",
//     alignSelf: "center",
//   },
//   createButtonText: {
//     color: "#fff",
//     fontSize: scale(16),
//     fontWeight: "bold",
//   },
//   loader: {
//     marginTop: scale(50),
//   },
//   charCount: {
//     fontSize: scale(12),
//     color: "#888",
//     marginTop: scale(5),
//     alignSelf: "flex-end",
//   },
// });

// export default CreateListModal;




import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { scale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { createList } from '../redux/actions/listActions';
import { useNavigation } from '@react-navigation/native';

const CreateListModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const { loading, error, list } = useSelector((state) => state.list);

  const [listName, setListName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [userId, setUserId] = React.useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          Alert.alert('User ID is missing! Please log in first.');
        }
      } catch (error) {
        Alert.alert('Error fetching userId');
      }
    };
    fetchUserId();
  }, []);

  const handleCreateList = () => {
    if (!userId) {
      Alert.alert('User ID is missing! Please log in first.');
      return;
    }
    if (listName.length > 60) {
      Alert.alert('List name cannot be longer than 60 characters.');
      return;
    }
    if (description.length > 280) {
      Alert.alert('List description cannot be longer than 280 characters.');
      return;
    }
    if (!listName) {
      Alert.alert('Please enter a list name.');
      return;
    }

    dispatch(createList(listName, description, userId));
  };

  useEffect(() => {
    if (list) {
      Alert.alert('Success', 'List created successfully.');
      navigation.goBack();
    }
  }, [list, navigation]);

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create new list</Text>

      <Text style={styles.label}>List name</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a name"
        placeholderTextColor="#666"
        value={listName}
        onChangeText={setListName}
        maxLength={60}
      />
      <Text style={styles.charCount}>{listName.length}/60</Text>

      <Text style={styles.label}>Description (optional)</Text>
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Add a description"
        placeholderTextColor="#666"
        value={description}
        onChangeText={setDescription}
        maxLength={280}
        multiline
      />
      <Text style={styles.charCount}>{description.length}/280</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      ) : (
        <TouchableOpacity style={styles.createButton} onPress={handleCreateList}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
    backgroundColor: 'black',
  },
  header: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: scale(10),
  },
  label: {
    fontSize: scale(14),
    color: '#fff',
    marginTop: scale(40),
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: scale(10),
    borderRadius: scale(5),
    marginTop: scale(5),
  },
  description: {
    height: scale(80),
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: 'green',
    padding: scale(8),
    alignItems: 'center',
    borderRadius: scale(5),
    marginTop: scale(50),
    width: '60%',
    alignSelf: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  loader: {
    marginTop: scale(50),
  },
  charCount: {
    fontSize: scale(12),
    color: '#888',
    marginTop: scale(5),
    alignSelf: 'flex-end',
  },
});

export default CreateListModal;
