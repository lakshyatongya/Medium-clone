import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Modal, TouchableWithoutFeedback } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { BlogIcon } from "./createBlogiconScreen";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Screen } from "react-native-screens";
import SavedBlog from "./SavedScreen";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [clickBlogId, setClickBlogId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Stories'); 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          setError('User is not logged in.');
          return;
        };

        const response = await axios.get(`http://10.0.2.2:3000/blog/${userId}/blogs`)
        setBlogs(response.data.blogs);
      } catch (err) {
        setError('Error fetching blogs.');
        console.error(err);
      }
    };

    if (isFocused) {
      fetchBlogs()
    }
  }, [isFocused]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); 
  };

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

  const handleEdit = (blogId, title, description, image) => {
    navigation.navigate("HomeStack",{screen:'BlogCreation',params: {
      blogId,
      title,
      description,
      image,
      isEdit: true,
    }});
    setModalVisible(false);
  }

  const handleDelete = async (blogId) => {
    try {
      const response = await axios.delete(`http://10.0.2.2:3000/blog/deleteBlog/${blogId}`)
      if (response.status === 200) {
        console.log("Blog deleted successfully");
        setBlogs(blogs.filter(blog => blog._id !== blogId));
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const renderBlogItem = ({ item }) => (
    <View style={styles.blogContainer}>
      
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeStack",{screen:'BlogDetails',params:{ blogId: item._id }})}
      > 
        
   
        <View style={styles.blogHeader}>
          <Text style={styles.title}>{item.title}</Text>

          {item.images && item.images.length > 0 && (
            <Image
              source={{ uri: item.images[0].url }}
              style={styles.image}
            />
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
          <FontAwesome name="comment" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dotsIcon}
          onPress={(event) => calculateDropdownPosition(event, item._id)} 
        >
          <Icon name="dots-three-horizontal" size={15} color="white" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible && clickBlogId === item._id}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContainer, { top: modalPosition.top, left: modalPosition.left }]}>
                <TouchableOpacity
                  onPress={() => handleEdit(item._id, item.title, item.description, item.image)}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.modalButton}>
                  <Text style={styles.modalText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                  <Text style={styles.modalText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );

  return (
    <View style={styles.Usercontainer}>
      <TouchableOpacity
        style={styles.SettingButton}
        onPress={() => navigation.navigate("Setting")}
      >
        <SimpleLineIcons name="settings" size={23} color="white" />
      </TouchableOpacity>

    
      <View style={styles.container}>
      <ScrollView horizontal style={styles.categoriesContainer}>
        <TouchableOpacity onPress={() => handleCategorySelect('Stories')}>
          <Text style={[styles.toptitle, selectedCategory === 'Stories' && styles.underline]}>
            Stories
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategorySelect('Lists')}>
          <Text style={[styles.toptitle, selectedCategory === 'Lists' && styles.underline]}>
            Lists
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategorySelect('About')}>
          <Text style={[styles.toptitle, selectedCategory === 'About' && styles.underline]}>
            About
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>

      <View style={styles.Blogarea}>
        <ScrollView style={styles.blogScrollbar}>
          {selectedCategory === 'Stories' && (
            <FlatList
              data={blogs}
              keyExtractor={(item) => item._id}
              renderItem={renderBlogItem}
            />
          )}
          {selectedCategory === 'Lists' && (
         <SavedBlog/>
          )}
          {selectedCategory === 'About' && (
            <Text style={styles.title}>About content...</Text>
          )}
        </ScrollView>
      </View>
{/* 
      <BlogIcon /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  Usercontainer: {
    flex: 1,
    backgroundColor: 'black',
    padding: moderateScale(1),
  },
  SettingButton: {
    marginLeft: '90%',
    marginTop: verticalScale(10),
  },
  container: {
    width: '100%',
    height: verticalScale(70),
    backgroundColor: 'black',
    flexDirection: 'row',
    paddingTop: verticalScale(20),
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
  },
  toptitle: {
    fontWeight: 'condensed',
    fontSize: moderateScale(14),
    color: 'white',
    marginRight: scale(10),
    marginLeft: moderateScale(10),
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: moderateScale(14),
    color: 'white',
    marginRight: scale(10),
  },
  Blogarea: {
    marginTop: verticalScale(10),
  },
  blogContainer: {
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
    margin: moderateScale(10),
  },
  blogDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  image: {
    width: scale(70),
    height: verticalScale(45),
    resizeMode: 'cover',
    borderRadius: moderateScale(1),
  },
  date: {
    color: 'gray',
    fontSize: moderateScale(10),
    marginLeft: moderateScale(10),
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
    marginLeft: moderateScale(20),
  },
  modalContainer: {
    backgroundColor: 'rgb(34, 32, 32)',
    padding: moderateScale(20),
    borderRadius: moderateScale(4),
    width: moderateScale(120),
    position: 'absolute',
  },
  modalButton: {
    padding: moderateScale(10),
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: moderateScale(12),
    color: 'white',
  },
 
  blogScrollbar: {
    borderRadius: moderateScale(10),
    height: '100%',
    marginBottom: verticalScale(50),
    maxHeight: '80%',
  },
  CommentIcon: {
    marginLeft: moderateScale(30),
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
 
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray', 
  },
});

export default ProfileScreen;
