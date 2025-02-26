



// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useAuth } from '../context/AuthContext'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome';
//  import Ionicons from 'react-native-vector-icons/Ionicons'

// import HomeScreen from '../screens/homeScreen';
// import SearchScreen from '../screens/searchScreen';
// import ProfileScreen from '../screens/profileScreen';
// import BlogCreation from '../screens/blogCreactionScreen';
// import FirstScreen from '../screens/firstScreen';
// import SecondScreen from '../screens/secondScreen';
// import Signinwithgoogle from '../screens/signinwithgoogle';
// import SigninScreen from '../screens/signinScreen';
// import SignupScreen from '../screens/signupScreen';
// import VerifyOtpScreen from '../screens/verifyOtpscreen';

// import SettingsScreen from '../screens/settingScreen';
// import BlogDetails from '../screens/BlogDetailsScreen';
// import BlogComments from '../screens/CommentScreen';
// import { BlogIcon } from '../screens/createBlogiconScreen';
// import PublishScreen from '../screens/PublishScreen';
// import SavedBlog from '../screens/SavedScreen';
// import CreateListModal from '../screens/CreateListModal';
// import BlogListScreen from '../screens/ListBlogScreen';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: { backgroundColor: 'rgb(34, 32, 32)' },
//         tabBarActiveTintColor: 'white',
//         tabBarInactiveTintColor: 'white',
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           title: 'Home',
//           headerTintColor: 'white',
//           tabBarLabelStyle: { display: 'none' },
//           headerStyle: { backgroundColor: 'black' },
//           tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={20} color={color} />,
//         }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={SearchScreen}
//         options={{
//           title: 'Search',
//           headerTintColor: 'white',
//           tabBarLabelStyle: { display: 'none' },
//           headerStyle: { backgroundColor: 'black' },
//           tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={20} color={color} />,
//         }}
//       />
//        <Tab.Screen
//         name="Saved"
//   component={SavedBlog}
//         options={{
//           title: 'Saved',
//           headerTintColor: 'white',
//           headerShown: false,
//           tabBarLabelStyle: { display: 'none' },
//           headerStyle: { backgroundColor: 'black' },
//           tabBarIcon: ({ color }) => <Ionicons name="bookmarks-outline" size={20} color={color} />,
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           title: 'Profile',
//           headerTintColor: 'white',
//           headerShown: false,
//           tabBarLabelStyle: { display: 'none' },
//           headerStyle: { backgroundColor: 'black' },
//           tabBarIcon: ({ color }) => <Icon name="user-o" size={20} color={color} />,
//         }}
//       />

//     </Tab.Navigator>
//   );
// };
// const MainNavigator = () => {
//   const { user } = useAuth();

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {user ? (
//           <>
//           <Stack.Screen
//             name="HomeTab"
//             component={TabNavigator}
//             options={{ headerShown: false }}
//           />
        //   <Stack.Screen
        //   name="BlogCreation"
        //   component={BlogCreation}
        //   options={{ headerShown: false }}
        // />
        
//         {/* <Stack.Screen
//           name="Stories"
//           component={StoriesScreen}
//           options={{ headerShown: false }}
//         /> */}
//         <Stack.Screen
//         name='Profile'
//         component={TabNavigator}
//         options={{headerShown:false}}
//         />

//         <Stack.Screen
//         name='Setting'
//         component={SettingsScreen}
//         options={{headerShown:false}}/>
//         <Stack.Screen
//         name='BlogDetails'
//         component={BlogDetails}
//         options={{headerShown:false}}/>
//         <Stack.Screen
//         name='BlogComments'
//         component={BlogComments}
//         options={{headerShown:false}} />
//         <Stack.Screen
//         name='PublishScreen'
//         component={PublishScreen}
//         options={{headerShown:false}}/>
//       <Stack.Screen
//       name="CreateList"
//       component={CreateListModal}
//       options={{headerShown:false}}/>
//       <Stack.Screen
//       name="ListBlogScreen"
//       component={BlogListScreen}
//       options={{headerShown:false}}/>
//         </>
//         ) : (
//           <>
//             <Stack.Screen
//               name="FirstScreen"
//               component={FirstScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="SecondScreen"
//               component={SecondScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Signin"
//               component={SigninScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Signup"
//               component={SignupScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="SigninwithGoogle"
//               component={Signinwithgoogle}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="VerifyOtp"
//               component={VerifyOtpScreen}
//               options={{ headerShown: false }}
//             />
//           </>
//         )}
        
       
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
// export default MainNavigator


import { StyleSheet, TouchableOpacity ,Text} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
 import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from '../screens/homeScreen';
import SearchScreen from '../screens/searchScreen';
import ProfileScreen from '../screens/profileScreen';
import BlogCreation from '../screens/blogCreactionScreen';
import FirstScreen from '../screens/firstScreen';
import SecondScreen from '../screens/secondScreen';
import Signinwithgoogle from '../screens/signinwithgoogle';
import SigninScreen from '../screens/signinScreen';
import SignupScreen from '../screens/signupScreen';
import VerifyOtpScreen from '../screens/verifyOtpscreen';

import SettingsScreen from '../screens/settingScreen';
import BlogDetails from '../screens/BlogDetailsScreen';
import BlogComments from '../screens/CommentScreen';
import { BlogIcon } from '../screens/createBlogiconScreen';
import PublishScreen from '../screens/PublishScreen';
import SavedBlog from '../screens/SavedScreen';
import CreateListModal from '../screens/CreateListModal';
import BlogListScreen from '../screens/ListBlogScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="BlogDetails" component={BlogDetails} />
      <Stack.Screen name="BlogComments" component={BlogComments}  />
      <Stack.Screen name="PublishScreen" component={PublishScreen} />
      <Stack.Screen name="CreateList" component={CreateListModal} />
    
      <Stack.Screen name="BlogCreation"component={BlogCreation}/>
      <Stack.Screen name="BlogListScreen" component={BlogListScreen} />  

    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Setting" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'rgb(34, 32, 32)' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Home',
          headerShown: false,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'black' },
          tabBarLabelStyle: { display: 'none' },
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          headerShown: false,
          tabBarLabelStyle: { display: 'none' },
          tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={20} color={color} />,
        }}
      />
     <Tab.Screen
  name="Saved"
  component={SavedBlog}
  options={({ navigation }) => ({
    title: 'Your Library',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: 'black' },
    headerShown: true,
    tabBarLabelStyle: { display: 'none' },
    tabBarIcon: ({ color }) => <Ionicons name="bookmarks-outline" size={20} color={color} />,
    headerRight: () => (
      <TouchableOpacity
        style={styles.createlistbutton}
        onPress={() => navigation.navigate("HomeStack", { screen: "CreateList" })}
      >
        <Text style={styles.Createlist}>New list</Text>
      </TouchableOpacity>
    ),
  })}
/>

      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarLabelStyle: { display: 'none' },
          tabBarIcon: ({ color }) => <Icon name="user-o" size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        <TabNavigator />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name="SecondScreen" component={SecondScreen} />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="SigninwithGoogle" component={Signinwithgoogle} />
          <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;





const styles =StyleSheet.create({
  createlistbutton: {
    marginTop: 6,
    backgroundColor: "green",
    width: "50%",
    height: "55%",
    borderRadius: 15,
    justifyContent: "center",
    marginRight:20,
  },
  Createlist: {
    color: "white",
    alignSelf: "center",
  },
})




































































































































































































































































































