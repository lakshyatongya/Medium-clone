// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Modal,
//   TouchableWithoutFeedback,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import Entypo from "react-native-vector-icons/Entypo";
// import { useNavigation, useIsFocused } from "@react-navigation/native";
// import { moderateScale, verticalScale } from "react-native-size-matters";

// const SavedBlog = () => {
//   const navigation = useNavigation();
//   const isFocused = useIsFocused(); 
//   const [userId, setUserId] = useState(null);
//   const [lists, setLists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
//   const [clickBlogId, setClickBlogId] = useState(null);

//   useEffect(() => {

//     const fetchUserId = async () => {
//       try {
//         const storedUserId = await AsyncStorage.getItem("userId");
//         if (storedUserId) {
//           setUserId(storedUserId);
//           fetchLists(storedUserId);
//         } else {
//           Alert.alert("User ID is missing! Please log in first.");
//           setLoading(false);
//         }
//       } catch (error) {
//         Alert.alert("Error fetching userId");
//         setLoading(false);
//       }
//     };

//     if (isFocused) {
//       fetchUserId(); 
//     }
//   }, [isFocused]); 

//   const fetchLists = async (userId) => {
//     try {
//       const response = await axios.get(`http://10.0.2.2:3000/lists/getlists/${userId}`);
//       setLists(response.data);
//     } catch (error) {
//       // Alert.alert("Error fetching lists", error?.response?.data?.error || error.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
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

//   const handleDeleteList = async () => {
//     if (clickBlogId) {
//       try {
//         const response = await axios.delete(`http://10.0.2.2:3000/lists/${clickBlogId}`);
//         Alert.alert("Success", "List deleted successfully.");
//         setLists((prevLists) => prevLists.filter((list) => list._id !== clickBlogId));
//         setModalVisible(false);
//       } catch (error) {
//         Alert.alert("Error", "Failed to delete the list.");
//         console.error("Error deleting list:", error);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.blogScrollbar}>
//         {loading ? (
          
//           <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
//         ) : lists.length === 0 ? (
//           <Text style={styles.noDataText}>No saved lists found.</Text>
//         ) : (
//           <FlatList
//             data={lists}
//             keyExtractor={(item) => item._id}
//             showsVerticalScrollIndicator={false}
//             renderItem={({ item }) => {
//               const blog = item.savedBlog[0]?.blog;
//               const images = blog?.images?.slice(0, 2);

//               return (
//                 <TouchableOpacity
//                   style={styles.card}
//                   onPress={() =>
//                     navigation.navigate("HomeStack", {
//                       screen: "BlogListScreen",
//                       params: {
//                         listId: item._id,
//                         listName: item.listname,
//                       },
//                     })
//                   }
//                 >
//                   <View style={styles.outertextContainer}>
//                     <View style={styles.textContainer}>
//                       <Text style={styles.title}>{item.listname}</Text>
//                       <Text style={styles.subtitle}>
//                         {item.savedBlog.length} {item.savedBlog.length === 1 ? "Story" : "Stories"}
//                       </Text>
//                     </View>
//                     <TouchableOpacity
//                       style={styles.dotsIcon}
//                       onPress={(event) => calculateDropdownPosition(event, item._id)}
//                     >
//                       <Entypo name="dots-three-vertical" size={15} color="white" />
//                     </TouchableOpacity>
//                   </View>

//                   <View style={styles.imageContainer}>
//                     {images && images.length > 0 ? (
//                       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                         {images.map((image, index) => (
//                           <Image key={index} source={{ uri: image.url }} style={styles.image} />
//                         ))}
//                       </ScrollView>
//                     ) : (
//                       <View style={styles.noImage}>
//                         <Text style={styles.noImageText}></Text>
//                       </View>
//                     )}
//                   </View>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         )}

//         <Modal
//           animationType="fade"
//           transparent={true}
//           visible={modalVisible && clickBlogId !== null}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//             <View style={styles.modalBackground}>
//               <TouchableWithoutFeedback>
//                 <View style={[styles.modalContainer, { top: modalPosition.top, left: modalPosition.left }]} >
//                   <TouchableOpacity style={styles.modalButton} onPress={handleDeleteList}>
//                     <Text style={styles.modalText}>Delete List</Text>
//                   </TouchableOpacity>
//                 </View>
//               </TouchableWithoutFeedback>
//             </View>
//           </TouchableWithoutFeedback>
//         </Modal>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   blogScrollbar: {
//     borderRadius: moderateScale(10),
//     height: "100%",
//     marginBottom: verticalScale(10),
//     maxHeight: "100%",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//     padding: 20,
//   },
//   card: {
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
//   },
//   imageContainer: {
//     marginTop: 15,
//   },
//   image: {
//     width: 140,
//     height: 100,
//     borderRadius: 1,
//     marginRight: 10,
//     backgroundColor: "#333",
//   },
//   outertextContainer: {
//     marginLeft: 5,
//     flexDirection: "row",
//   },
//   textContainer: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#ffffff",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#b0b0b0",
//     marginTop: 4,
//   },
//   noDataText: {
//     fontSize: 16,
//     color: "#b0b0b0",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   dotsIcon: {
//     color: "white",
//     alignSelf: "flex-end",
//   },
//   modalBackground: {
//     flex: 1,
//     position: "relative",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     backgroundColor: "rgb(34, 32, 32)",
//     padding: moderateScale(20),
//     borderRadius: moderateScale(4),
//     width: moderateScale(100),
//     position: "absolute",
//   },
//   modalButton: {
//     width: "100%",
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: moderateScale(12),
//     color: "white",
//     textAlign: "center",
//   },
// });

// export default SavedBlog;


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import LottieView from 'lottie-react-native'; // Import LottieView

const SavedBlog = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [userId, setUserId] = useState(null);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [clickBlogId, setClickBlogId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
          fetchLists(storedUserId);
        } else {
          Alert.alert("User ID is missing! Please log in first.");
          setLoading(false);
        }
      } catch (error) {
        Alert.alert("Error fetching userId");
        setLoading(false);
      }
    };

    if (isFocused) {
      fetchUserId(); 
    }
  }, [isFocused]);

  const fetchLists = async (userId) => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/lists/getlists/${userId}`);
      setLists(response.data);
    } catch (error) {
      // Alert.alert("Error fetching lists", error?.response?.data?.error || error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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

  const handleDeleteList = async () => {
    if (clickBlogId) {
      try {
        const response = await axios.delete(`http://10.0.2.2:3000/lists/${clickBlogId}`);
        Alert.alert("Success", "List deleted successfully.");
        setLists((prevLists) => prevLists.filter((list) => list._id !== clickBlogId));
        setModalVisible(false);
      } catch (error) {
        Alert.alert("Error", "Failed to delete the list.");
        console.error("Error deleting list:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.blogScrollbar}>
        {loading ? (
          <LottieView
            source={require('../assets/animations/Animation - 1740390339541.json')}
            autoPlay
            loop
            style={styles.loadingAnimation}
          />
        ) : lists.length === 0 ? (
          <Text style={styles.noDataText}>No saved lists found.</Text>
        ) : (
          <FlatList
            data={lists}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const blog = item.savedBlog[0]?.blog;
              const images = blog?.images?.slice(0, 2);

              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate("HomeStack", {
                      screen: "BlogListScreen",
                      params: {
                        listId: item._id,
                        listName: item.listname,
                      },
                    })
                  }
                >
                  <View style={styles.outertextContainer}>
                    <View style={styles.textContainer}>
                      <Text style={styles.title}>{item.listname}</Text>
                      <Text style={styles.subtitle}>
                        {item.savedBlog.length} {item.savedBlog.length === 1 ? "Story" : "Stories"}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.dotsIcon}
                      onPress={(event) => calculateDropdownPosition(event, item._id)}
                    >
                      <Entypo name="dots-three-vertical" size={15} color="white" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.imageContainer}>
                    {images && images.length > 0 ? (
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {images.map((image, index) => (
                          <Image key={index} source={{ uri: image.url }} style={styles.image} />
                        ))}
                      </ScrollView>
                    ) : (
                      <View style={styles.noImage}>
                        <Text style={styles.noImageText}></Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
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
                <View style={[styles.modalContainer, { top: modalPosition.top, left: modalPosition.left }]} >
                  <TouchableOpacity style={styles.modalButton} onPress={handleDeleteList}>
                    <Text style={styles.modalText}>Delete List</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  blogScrollbar: {
    borderRadius: moderateScale(10),
    height: "100%",
    marginBottom: verticalScale(10),
    maxHeight: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  card: {
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
  },
  imageContainer: {
    marginTop: 15,
  },
  image: {
    width: 140,
    height: 100,
    borderRadius: 1,
    marginRight: 10,
    backgroundColor: "#333",
  },
  outertextContainer: {
    marginLeft: 5,
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 14,
    color: "#b0b0b0",
    marginTop: 4,
  },
  noDataText: {
    fontSize: 16,
    color: "#b0b0b0",
    textAlign: "center",
    marginTop: 20,
  },
  dotsIcon: {
    color: "white",
    alignSelf: "flex-end",
  },
  modalBackground: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "rgb(34, 32, 32)",
    padding: moderateScale(20),
    borderRadius: moderateScale(4),
    width: moderateScale(100),
    position: "absolute",
  },
  modalButton: {
    width: "100%",
    alignItems: "center",
  },
  modalText: {
    fontSize: moderateScale(12),
    color: "white",
    textAlign: "center",
  },
  loadingAnimation: {
    width: 100, // Adjust the size
    height: 100, // Adjust the size
    alignSelf: "center",
  },
});

export default SavedBlog;
