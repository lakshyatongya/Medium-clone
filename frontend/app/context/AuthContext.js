
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const LoginStatus = async () => {
//       try {
//         const userId = await AsyncStorage.getItem('userId');
//         if (userId) {
//           setUser(userId);
//         }
//       } catch (error) {
//         console.error('Error fetching user data from AsyncStorage:', error);
//       }
//     };

//     LoginStatus();
//   }, []);

//   const login = (userId) => {
//     setUser(userId);
//     AsyncStorage.setItem('userId', userId);
//   };

//   const logout = async () => {
//     setUser(null);
//     await AsyncStorage.removeItem('userId');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };




import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          setUser(userId);
        }
      } catch (error) {
        console.error('Error fetching user data from AsyncStorage:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const login = (userId) => {
    setUser(userId);
    AsyncStorage.setItem('userId', userId);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
