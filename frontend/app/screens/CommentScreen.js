
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import { format } from 'date-fns';
// import { useAuth } from '../context/AuthContext'; 
// import { moderateScale,verticalScale } from 'react-native-size-matters';
// const BlogComments = ({ route }) => {
//   const { blogId } = route.params;  
//   const [comments, setComments] = useState([]); 
//   const [content, setContent] = useState(''); 
//   const [loading, setLoading] = useState(false);  

 
//   const { user } = useAuth();  


//   useEffect(() => {
//     const fetchComments = async () => {
//       setLoading(true);
//       try {
//         // const response = await axios.get(`http://10.0.2.2:3000/Comment/comments/${blogId}`);
//         const response = await axios.get(`http://10.0.2.2:3000/Comment/comments/${blogId}`);
//         console.log('Response Data:', response.data.comments);  
//         setComments(response.data.comments);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchComments();
//   }, [blogId]);


  
//   const postComment = async () => {
//     if (!content.trim()) {
//       alert('Comment content cannot be empty.');
//       return;
//     }

//     if (!user) {
//       alert('You must be logged in to post a comment');
//       return;
//     }

//     const requestData = {
//       blogId,
//       userId: user,  
//       content,
//     };

//     console.log('Request Data:', requestData);  

//     try {
//       // const response = await axios.post('http://10.0.2.2:3000/Comment/add', requestData);
//       const response = await axios.post('http://10.0.2.2:3000/Comment/add', requestData);
//       setComments([...comments, response.data.comment]);
//       setContent('');  
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Comments</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="white" />
//       ) : (
//         <>
//           {comments.length === 0 ? (
//             <Text style={styles.noCommentsText}>No comments yet.</Text>
//           ) : (
//             <FlatList
//             data={comments}
//             renderItem={({ item }) => (
//               <View style={styles.commentContainer}>
//                 <Text style={styles.Userid}>
//                   {item.userId ? item.userId.name : 'Unknown User'}
//                 </Text>
       
//                 <Text style={styles.commentText}>{item.content}</Text>
//                 <Text style={styles.date}>
//                   {format(new Date(item.createdAt), 'MMM dd, yyyy')}
//                 </Text>
//               </View>
//             )}
//             keyExtractor={(item) => item._id}
//           />
         
//           )}
//         </>
//       )}

//       <View style={styles.commentInputContainer}>
//         <TextInput
//           style={styles.commentInput}
//           placeholder="Add a comment..."
//           placeholderTextColor="#bbb"
//           value={content}
//           multiline
//           onChangeText={setContent}
//         />
//         <TouchableOpacity style={styles.postButton} onPress={postComment}>
//           <Text style={styles.buttonText}>comment</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: moderateScale(10),  
//     backgroundColor: 'black',
//   },
//   title: {
//     fontSize: moderateScale(24), 
//     fontWeight: 'bold',
//     marginBottom: verticalScale(20),  
//     color: 'white',
//   },
//   noCommentsText: {
//     color: 'white',
//     fontSize: moderateScale(16),  
//     textAlign: 'center',
//     marginTop: verticalScale(20),
//   },
//   commentContainer: {
//     padding: moderateScale(10),
//     marginBottom: verticalScale(10),
//     borderRadius: moderateScale(5),
//     borderColor: 'gray',
//     borderWidth: 1,
//     backgroundColor: '#333',
//   },
//   Userid: {
//     fontSize: moderateScale(14),  
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   commentText: {
//     fontSize: moderateScale(16),  
//     color: 'white',
//     marginTop: verticalScale(5),
//   },
//   date: {
//     fontSize: moderateScale(12),  
//     marginTop: verticalScale(10),
//     color: 'white',
//   },
//   commentInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: verticalScale(20),  
//   },
//   commentInput: {
//     flex: 1,
//     padding: moderateScale(10),  
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginRight: moderateScale(10),
//     borderRadius: moderateScale(5),
//     color: 'white',
//     backgroundColor: '#222',
//   },
//   postButton: {
//     backgroundColor: 'green',
//     height: verticalScale(40),  
//     borderRadius: moderateScale(10),
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: moderateScale(100),
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: moderateScale(14),
//     textAlign:"center"
//   },
// });

// export default BlogComments;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, postComment } from '../redux/actions/commentActions';
import { Text, View, TextInput, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext'; 
const BlogComments = ({ route }) => {
  const { blogId } = route.params;
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { user } = useAuth();
 
  const { comments, loading, error } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments(blogId)); 
  }, [blogId, dispatch]);

  const handlePostComment = () => {
    if (!content.trim()) {
      alert('Comment content cannot be empty.');
      return;
    }

    const userId= user;
    dispatch(postComment(blogId, userId, content));
    setContent('');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  return (
    <View style={styles.container}>
     

      <FlatList
        data={comments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.Userid}>
              {item.userId ? item.userId.name : 'Unknown User'}
            </Text>
            <Text style={styles.commentText}>{item.content}</Text>
            <Text style={styles.date}>
              {format(new Date(item.createdAt), 'MMM dd, yyyy')}
            </Text>
          </View>
        )}
      />
       <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Add a comment"
        placeholderTextColor="#bbb"
        style={styles.commentInput}
        multiline
      />
      <Button title="Post Comment" onPress={handlePostComment} />
      
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10),
    backgroundColor: 'black',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: 'white',
    padding: moderateScale(10),
    marginBottom: verticalScale(10),
  },
  commentContainer: {
    padding: moderateScale(10),
    marginBottom: verticalScale(10),
    borderRadius: moderateScale(5),
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#333',
  },
  Userid: {
    fontSize: moderateScale(14),
    color: 'white',
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: moderateScale(16),
    color: 'white',
    marginTop: verticalScale(5),
  },
  date: {
    fontSize: moderateScale(12),
    marginTop: verticalScale(10),
    color: 'white',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
});

export default BlogComments;
