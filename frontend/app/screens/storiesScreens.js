import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, View, FlatList, Alert, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale } from 'react-native-size-matters';
import { BlogIcon } from './createBlogiconScreen';
import { format } from 'date-fns';
const StoriesScreen = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                console.log(userId);

                if (!userId) {
                    setError('User is not logged in.');
                    return;
                }
                // const response = await axios.get(`http://10.0.2.2:3000/blog/67a5faea0b6ecea8c3a65195/blogs`);
                const response = await axios.get(`http://10.0.2.2:3000/blog/${userId}/blogs`);
                setBlogs(response.data.blogs);
                console.log(response);
            } catch (err) {
                setError('Error fetching blogs.');
                console.error(err);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.Blogarea}>
                <ScrollView style={styles.blogScrollbar}>
                    <FlatList
                        data={blogs}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.blogContainer}>
                                <View style={styles.blogHeader}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    {item.image && (
                                        <Image
                                            source={{ uri: item.image }}
                                            style={styles.image}
                                        />
                                    )}
                                </View>


                                <View style={styles.blogDate}>
                                    <Text style={styles.date}>
                                        {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                                    </Text>

                                </View>

                            </View>
                        )}
                    />
                </ScrollView>

                <BlogIcon />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: scale(1),
        backgroundColor: "black",
        padding: scale(1),
    },
    Blogarea: {
        marginTop: verticalScale(10),
    },
    blogContainer: {
        flex: scale(1),
        padding: scale(15),
        borderRadius: 5,
        marginBottom: 1,
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
        justifyContent: 'space-between',
        marginBottom: verticalScale(10),
    },
    title: {
        flex: 1,
        fontWeight: "bold",
        fontSize: verticalScale(14),
        color: "white",
        marginRight: scale(10),
    },
    description: {
        fontSize: verticalScale(16),
        color: "white",
        textAlign: "center",
        marginBottom: 10,
    },
    image: {
        width: scale(70),
        height: verticalScale(45),
        resizeMode: 'cover',
        borderRadius: 1,
    },
    date: {
        color: "white",
        fontSize: verticalScale(10),
    },

    blogScrollbar: {
        borderRadius: 10,
        height: "100%",
        marginBottom: verticalScale(50),
        maxHeight: "80%",
    },

});

export default StoriesScreen;
