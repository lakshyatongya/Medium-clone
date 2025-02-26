// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Alert,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Modal,
//   TouchableWithoutFeedback
// } from "react-native";
// import axios from "axios";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Entypo from "react-native-vector-icons/Entypo";
// import LottieView from 'lottie-react-native'; 
// import { useRoute, useNavigation } from "@react-navigation/native";
// import { scale, moderateScale } from "react-native-size-matters";

// const BlogListScreen = () => {
//   const route = useRoute();
//   const { listId, listName } = route.params;
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();
//   const [clickBlogId, setClickBlogId] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axios.get(`http://10.0.2.2:3000/lists/${listId}/blogs`);
//         console.log("Fetched blogs:", response.data);
//         setBlogs(response.data);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//         Alert.alert(
//           "Error fetching blogs",
//           error?.response?.data?.error || error.message || "Something went wrong"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, [listId]);

//   const handleBlogPress = (blogId) => {
//     navigation.navigate("BlogDetails", { blogId, listId });
//   };

//   const calculateDropdownPosition = (size, blogId) => {
//     size.target.measure((x, y, width, height, pageX, pageY) => {
//       setModalPosition({
//         top: pageY + height,
//         left: pageX - 120,
//       });
//     });
//     setClickBlogId(blogId);
//     setModalVisible(true);
//   };



  
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>{listName} - Stories</Text>
//       {loading ? (
//         <LottieView
//           source={require('../assets/animations/Animation - 1740390339541.json')}
//           autoPlay
//           loop
//           style={styles.loadingAnimation}
//         />
//       ) : blogs.length === 0 ? (
//         <Text style={styles.noDataText}>No blogs found in this list.</Text>
//       ) : (
//         <FlatList
//           data={blogs}
//           keyExtractor={(item) => item._id}
//           showsVerticalScrollIndicator={false}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleBlogPress(item._id)}>
//               <View style={styles.blogCard}>
//                 <View style={styles.blogContent}>
//                   {item.images?.length > 0 && (
//                     <Image
//                       source={{ uri: item.images[0].url }}
//                       style={styles.blogImage}
//                     />
//                   )}
//                   <Text style={styles.blogTitle}>{item.title}</Text>
//                   <TouchableOpacity
//                     style={styles.dotsIcon}
//                     onPress={(event) => calculateDropdownPosition(event, item._id)}
//                   >
//                     <Entypo name="dots-three-vertical" size={15} color="white" />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible && clickBlogId !== null}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//           <View style={styles.modalBackground}>
//             <TouchableWithoutFeedback>
//               <View
//                 style={[
//                   styles.modalContainer,
//                   { top: modalPosition.top, left: modalPosition.left },
//                 ]}
//               >
//                 <TouchableOpacity style={styles.modalButton} >
//   <Ionicons name="bookmarks-sharp" size={20} color={"white"} />
//   <Text style={styles.modalText}>Un-save</Text>
// </TouchableOpacity>


//                 <TouchableOpacity
//                   onPress={() => setModalVisible(false)}
//                   style={styles.modalButton}
//                 >
//                   <Entypo name="cross" size={20} color={"white"} />
//                   <Text style={styles.modalText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>c
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//     marginBottom: 10,
//   },
//   loadingAnimation: {
//     width: scale(150), 
//     height: scale(150), 
//     alignSelf: "center",
//     marginTop: 50,
//   },
//   blogCard: {
//     backgroundColor: "black",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//     borderColor: "#1e1e1e",
//     borderWidth: 1,
//     shadowColor: "#000",
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//     position: 'relative',
//   },
//   blogContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   blogTitle: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "white",
//     marginLeft: 10,
//   },
//   blogImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 5,
//   },
//   noDataText: {
//     fontSize: 16,
//     color: "#b0b0b0",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   dotsIcon: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     zIndex: 10,
//   },
//   modalBackground: {
//     flex: 1,
//     position: 'relative',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: moderateScale(5),
//   },
//   modalContainer: {
//     backgroundColor: 'rgb(34, 32, 32)',
//     padding: moderateScale(20),
//     borderRadius: moderateScale(4),
//     width: moderateScale(130),
//     height: moderateScale(150),
//     position: 'absolute',
//   },
//   modalButton: {
//     flex: 1,
//     width: '100%',
//     alignItems: 'center',
//     flexDirection: "row",
//   },
//   modalText: {
//     fontSize: moderateScale(12),
//     color: 'white',
//     marginLeft: 10,
//   },
// });

// export default BlogListScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import LottieView from 'lottie-react-native'; 
import { useRoute, useNavigation } from "@react-navigation/native";
import { scale, moderateScale } from "react-native-size-matters";

const BlogListScreen = () => {
  const route = useRoute();
  const { listId, listName } = route.params;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [clickBlogId, setClickBlogId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/lists/${listId}/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        Alert.alert(
          "Error fetching blogs",
          error?.response?.data?.error || error.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [listId]);

  const handleBlogPress = (blogId) => {
    navigation.navigate("BlogDetails", { blogId, listId });
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

  const handleUnSaveBlog = async () => {
    if (!clickBlogId) return;

    try {
    
      const response = await axios.delete(
        `http://10.0.2.2:3000/lists/${listId}/delete-blog`,
        { data: { blogId: clickBlogId } }  
      );
      console.log("Blog removed:", response.data);
      
    
      setBlogs(blogs.filter((blog) => blog._id !== clickBlogId));

    
      setModalVisible(false);
    } catch (error) {
      console.error("Error removing blog:", error);
      Alert.alert(
        "Error",
        error?.response?.data?.error || error.message || "Something went wrong"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{listName} - Stories</Text>
      {loading ? (
        <LottieView
          source={require('../assets/animations/Animation - 1740390339541.json')}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      ) : blogs.length === 0 ? (
        <Text style={styles.noDataText}>No blogs found in this list.</Text>
      ) : (
        <FlatList
          data={blogs}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleBlogPress(item._id)}>
              <View style={styles.blogCard}>
                <View style={styles.blogContent}>
                  {item.images?.length > 0 && (
                    <Image
                      source={{ uri: item.images[0].url }}
                      style={styles.blogImage}
                    />
                  )}
                  <Text style={styles.blogTitle}>{item.title}</Text>
                  <TouchableOpacity
                    style={styles.dotsIcon}
                    onPress={(event) => calculateDropdownPosition(event, item._id)}
                  >
                    <Entypo name="dots-three-vertical" size={15} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible && clickBlogId !== null}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View
                style={[styles.modalContainer, { top: modalPosition.top, left: modalPosition.left }]}
              >
                <TouchableOpacity onPress={handleUnSaveBlog} style={styles.modalButton}>
                  <Ionicons name="bookmarks-sharp" size={20} color={"white"} />
                  <Text style={styles.modalText}>Un-save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.modalButton}
                >
                  <Entypo name="cross" size={20} color={"white"} />
                  <Text style={styles.modalText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  loadingAnimation: {
    width: scale(150), 
    height: scale(150), 
    alignSelf: "center",
    marginTop: 50,
  },
  blogCard: {
    backgroundColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderColor: "#1e1e1e",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: 'relative',
  },
  blogContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  blogImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  noDataText: {
    fontSize: 16,
    color: "#b0b0b0",
    textAlign: "center",
    marginTop: 20,
  },
  dotsIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  modalBackground: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(5),
  },
  modalContainer: {
    backgroundColor: 'rgb(34, 32, 32)',
    padding: moderateScale(20),
    borderRadius: moderateScale(4),
    width: moderateScale(130),
    height: moderateScale(150),
    position: 'absolute',
  },
  modalButton: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: "row",
  },
  modalText: {
    fontSize: moderateScale(12),
    color: 'white',
    marginLeft: 10,
  },
});

export default BlogListScreen;
