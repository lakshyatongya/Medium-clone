// import React, { useEffect, useState } from "react";
// import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
// import axios from 'axios';
// import { useRoute } from '@react-navigation/native'; 
// import { format } from 'date-fns';
// import { scale, verticalScale } from "react-native-size-matters";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// const BlogDetails = () => {
//     const route = useRoute();
//     const { blogId } = route.params;
//     const [blog, setBlog] = useState(null);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const BlogDetails = async () => {
//             try {
//                 // const response = await axios.get(`http://10.0.2.2:3000/blog/getBlogById/${blogId}`);
//                 const response = await axios.get(`http://10.0.2.2:3000/blog/getBlogById/${blogId}`);
//                 setBlog(response.data.blog);
//                 setLoading(false);
//                 console.log(response);
//             } catch (err) {
//                 setError('Error fetching blog details.');
//                 setLoading(false);
//                 console.log(err);
//             }
//         };

//         BlogDetails();
//     }, [blogId]);

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#fff" />
//             </View>
//         );
//     }

//     if (error) {
//         return (
//             <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{error}</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <ScrollView style={styles.blogScrollbar}>
//                 <Text style={styles.title}>{blog.title}</Text>
//                 {blog.image && (
//                     <Image
//                         source={{ uri: blog.image }}
//                         style={styles.image}
//                     />
//                 )}
//                 <Text style={styles.description}>{blog.description}</Text>

             
//                 {blog.images && blog.images.length > 0 && blog.images.map((image, index) => (
//                     <View key={index} style={styles.imageContainer}>
//                         <Image
//                             source={{ uri: image.url }}
//                             style={styles.image}
//                         />
//                         {image.caption && <Text style={styles.imageCaption}>{image.caption}</Text>}
//                     </View>
//                 ))}

//                 <View style={styles.blogDate}>
//                     <Text style={styles.date}>
//                         {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
//                     </Text>
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "black",
//         padding: scale(1),
//     },
//     blogScrollbar: {
//         flex: 1, 
//         marginBottom: verticalScale(10),
//     },
//     title: {
//         marginTop: "10%",
//         fontWeight: "bold",
//         fontSize: verticalScale(25),
//         color: "white",
//         justifyContent: "center",
//         textAlign: "center"
//     },
//     description: {
//         fontSize: verticalScale(15),
//         color: "white",
//         marginTop: verticalScale(50),
//         justifyContent: "center",
//         textAlign: "center"
//     },
//     image: {
//         width: "90%",
//         height: verticalScale(200),
//         marginTop: verticalScale(20),
//         resizeMode: 'cover',
//         borderRadius: 5,
//         justifyContent: "center",
//         alignSelf: "center"
//     },
//     imageContainer: {
//         marginTop: verticalScale(20),
//         alignItems: "center",
//     },
//     imageCaption: {
//         color: "white",
//         fontSize: verticalScale(14),
//         marginTop: verticalScale(5),
//         textAlign: "center",
//     },
//     blogDate: {
//         flexDirection: "row",
//         marginTop: verticalScale(10),
//     },
//     date: {
//         color: "gray",
//         fontSize: verticalScale(10),
//         marginLeft: 20,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'black',
//     },
//     errorContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'black',
//     },
//     errorText: {
//         color: 'white',
//         fontSize: 18,
//     },
// });

// export default BlogDetails;

import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { fetchBlogDetails } from '../redux/actions/blogdetailsActions';
import { scale, verticalScale } from 'react-native-size-matters';

const BlogDetails = () => {
  const route = useRoute();
  const { blogId } = route.params;

  const dispatch = useDispatch();
  const { blog, loading, error } = useSelector(state => state.blogDetails);


  useEffect(() => {
    dispatch(fetchBlogDetails(blogId));
  }, [dispatch, blogId]);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!blog) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No blog data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.blogScrollbar}>
        <Text style={styles.title}>{blog.title}</Text>
        {blog.image && (
          <Image
            source={{ uri: blog.image }}
            style={styles.image}
          />
        )}
        <Text style={styles.description}>{blog.description}</Text>

        {blog.images && blog.images.length > 0 && blog.images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={{ uri: image.url }}
              style={styles.image}
            />
            {image.caption && <Text style={styles.imageCaption}>{image.caption}</Text>}
          </View>
        ))}

        <View style={styles.blogDate}>
          <Text style={styles.date}>
            {blog.createdAt && !isNaN(new Date(blog.createdAt)) 
              ? format(new Date(blog.createdAt), 'MMM dd, yyyy') 
              : 'Date not available'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: scale(1),
  },
  blogScrollbar: {
    flex: 1,
    marginBottom: verticalScale(10),
  },
  title: {
    marginTop: "10%",
    fontWeight: "bold",
    fontSize: verticalScale(25),
    color: "white",
    justifyContent: "center",
    textAlign: "center",
  },
  description: {
    fontSize: verticalScale(15),
    color: "white",
    marginTop: verticalScale(50),
    justifyContent: "center",
    textAlign: "center",
  },
  image: {
    width: "90%",
    height: verticalScale(200),
    marginTop: verticalScale(20),
    resizeMode: 'cover',
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center",
  },
  imageContainer: {
    marginTop: verticalScale(20),
    alignItems: "center",
  },
  imageCaption: {
    color: "white",
    fontSize: verticalScale(14),
    marginTop: verticalScale(5),
    textAlign: "center",
  },
  blogDate: {
    flexDirection: "row",
    marginTop: verticalScale(10),
  },
  date: {
    color: "gray",
    fontSize: verticalScale(10),
    marginLeft: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
  },
});

export default BlogDetails;
