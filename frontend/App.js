// import React from 'react';
// import { AuthProvider } from './app/context/AuthContext';
// import MainNavigator from './app/navigation/mainNavigation';
// const App = () => {
//   return (
//     <AuthProvider>
//       <MainNavigator />
//     </AuthProvider>
//   );
// };
// export default App;



import React from 'react';
import { Provider } from 'react-redux'; 
import { AuthProvider } from './app/context/AuthContext';
import MainNavigator from './app/navigation/mainNavigation';
import store from './app/redux/store/store';

const App = () => {
  return (
    <Provider store={store}>  
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </Provider>
  );
};

export default App;
