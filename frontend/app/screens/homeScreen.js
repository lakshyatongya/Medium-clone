import React, { useEffect, useState, useRef } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Text, View, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import axios from 'axios';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { format } from 'date-fns';
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import HeaderScreen from "../navigation/header";
import { BlogIcon } from "../screens/createBlogiconScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from 'lottie-react-native';


const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [clickBlogId, setClickBlogId] = useState(null);
  const bottomSheetRef = useRef();
  const [lists, setLists] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedLists, setSelectedLists] = useState({});
  const [loading, setLoading] = useState(true);
 
  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        Alert.alert("User ID is missing! Please log in first.");
      }
    } catch (error) {
      Alert.alert("Error fetching userId");
    }
  };
  
  
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/blog/getAllblogs');
      setBlogs(response.data.allblogs);
      setLoading(false);
    } catch (err) {
      setError('Error fetching blogs.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserId(); 
  }, []);


  const fetchUserLists = async () => {
    if (userId) {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/lists/getlists/${userId}`);
        setLists(response.data);
      } catch (err) {
        setError('Error fetching lists for user.');
      }
    }
  };
  useEffect(() => {
    fetchUserLists();
  }, [userId]);

  useEffect(() => {
    if (isFocused) {
      fetchUserLists();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      fetchBlogs(); 
    }
  }, [isFocused]);
  
  
  const calculateDropdownPosition = (size, blogId) => {
    size.target.measure((x, y, width, height, pageX, pageY) => {
      setModalPosition({
        top: pageY + height,
        left: pageX - 120,
      });
    });
    setClickBlogId(blogId);
    setModalVisible(true);
  };

  
  const openBottomSheet = () => {
    setModalVisible(false);
    bottomSheetRef.current.open();
  };

  const handleCheckboxToggle = (listId) => {
    setSelectedLists(prev => ({
      ...prev,
      [listId]: !prev[listId],
    }));
  };
 
 
  const handleSaveBlogToList = async () => {
    try {
     
      const selectedListIds = Object.keys(selectedLists).filter(
        (listId) => selectedLists[listId]
      );
  
      if (selectedListIds.length > 0) {
      
        for (const listId of selectedListIds) {
          await axios.post(`http://10.0.2.2:3000/lists/${listId}/save-blog`, {
            blogId: clickBlogId,
          });
        }
        Alert.alert("Blog saved to the selected lists!");
        bottomSheetRef.current.close();
      } else {
        Alert.alert("Please select at least one list.");
      }
    } catch (error) {
      Alert.alert("Error saving blog to the lists.");
    }
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>
      <HeaderScreen />
      <View style={[styles.Blogarea, isFocused && styles.focused]}>
        <ScrollView style={styles.blogScrollbar}>
        {loading ? (
        <LottieView
          source={require('../assets/animations/Animation - 1740390339541.json')}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      ):(
          <FlatList
            data={blogs}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.blogContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('BlogDetails', { blogId: item._id })}>
                  <View style={styles.blogHeader}>
                    <Text style={styles.title}>{item.title}</Text>
                    {item.images && item.images.length > 0 && (
                      <Image source={{ uri: item.images[0].url }} style={styles.image} />
                    )}
                  </View>
                </TouchableOpacity>

                <View style={styles.blogDate}>
                  <MaterialCommunityIcons name="star-four-points" size={15} color="gold" />
                  <Text style={styles.date}>
                    {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                  </Text>
                  <TouchableOpacity
                    style={styles.CommentIcon}
                    onPress={() => navigation.navigate('BlogComments', { blogId: item._id })}
                  >
                    <Icon name="comment" size={18} color="gray" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dotsIcon}
                    onPress={(event) => calculateDropdownPosition(event, item._id)}
                  >
                    <Entypo name="dots-three-vertical" size={15} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
      )}
        </ScrollView>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible && clickBlogId !== null}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContainer, { top: modalPosition.top, left: modalPosition.left }]}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={openBottomSheet}
                >
                  <Ionicons name="bookmarks-outline" size={20} color={"white"} />
                  <Text style={styles.modalText}>Saved</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                  <Entypo name="cross" size={20} color={"white"}/>
                  <Text style={styles.modalText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      
      <RBSheet
        ref={bottomSheetRef}
        height={300}
        openDuration={20}
        closeDuration={20}
        customStyles={{
          container: {
            backgroundColor: 'rgb(34, 32, 32)',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }
        }}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.modalText}>Save to</Text>
          <TouchableOpacity style={styles.doneButton} onPress={handleSaveBlogToList}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.CreatelistContainer} onPress={() => navigation.navigate("CreateList")}>
              <Text style={styles.Createlist}>Create new List ......</Text>
            </TouchableOpacity>
        <FlatList
          data={lists}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => handleCheckboxToggle(item._id)}>

        <View style={styles.list}> 
        <TouchableOpacity
                onPress={() => handleCheckboxToggle(item._id)}
                style={styles.checkbox}
              >
                {selectedLists[item._id] && (
                  <MaterialCommunityIcons name="checkbox-marked" size={20} color="green" />
                )}
                {!selectedLists[item._id] && (
                  <MaterialCommunityIcons name="checkbox-blank-outline" size={20} color="white" />
                )}
              </TouchableOpacity>
               <Text style={styles.listName}>{item.listname}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        

      </RBSheet>
      <BlogIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
   color:"white",
    padding:10,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: scale(1),
  },
  Blogarea: {
    marginTop: verticalScale(10),
    marginBottom:verticalScale(20)
  },
  blogContainer: {
    flex: 1,
    padding: moderateScale(15),
    marginBottom: verticalScale(10),
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
  },
  blogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  blogDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    fontSize: moderateScale(14),
    color: "white",
    marginRight: scale(5),
  },
  image: {
    width: moderateScale(70),
    height: verticalScale(45),
    resizeMode: 'cover',
    borderRadius: 1,
  },
  date: {
    color: "gray",
    fontSize: moderateScale(10),
    marginLeft: scale(20),
  },
  CommentIcon: {
    marginLeft: moderateScale(30),
  },
  blogScrollbar: {
    borderRadius: moderateScale(10),
    height: "100%",
    marginBottom: verticalScale(50),
    maxHeight: "80%",
  },
  dotsIcon: {
    color: 'white',
    marginLeft: '50%',
  },
  modalBackground: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(40),
  },
  modalContainer: {
    backgroundColor: 'rgb(34, 32, 32)',
    padding: moderateScale(20),
    borderRadius: moderateScale(4),
    width: moderateScale(100),
    height: moderateScale(150),
    position: 'absolute',
  },
  modalButton: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection:"row",

  },
  modalText: {
    fontSize: moderateScale(12),
    color: 'white',
    marginLeft:10,
  },
  bottomSheetContent: {
    padding: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doneButton: {
    backgroundColor: 'rgb(34, 32, 32)',
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(5),
  },
  doneText: {
    color: 'white',
    fontSize: moderateScale(12),
  },
  CreatelistContainer: {
    marginLeft: 10,
  },
  Createlist: {

    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
  listItem: {
    padding: moderateScale(5),
  },
  list:{
flexDirection:"row",
marginTop:20,
marginRight:50,
  },
  listName: {
    flexDirection:"row",
    color: 'white',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
 
  },
  checkbox: {
    marginRight: scale(20),

  },
  loadingAnimation: {
    width: 150, 
    height: 150, 
    alignSelf: "center",
    marginTop:"40%"
  },
});

export default HomeScreen;





