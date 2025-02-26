import { useEffect, useState } from 'react';
import { View, Pressable ,Text, TouchableOpacity} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


 function Signinwithgoogle() {
const[userInfo ,setUserInfo]=useState(null);
  
useEffect(()=>{
    GoogleSignin.configure( {
         androidClientId: "1014674294081-o3uq8ba79ishvin1ul04nt9uq7ibb0gv.apps.googleusercontent.com",
  }  );
},[])


const signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
    setUserInfo(usrInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
       
      } else if (error.code === statusCodes.IN_PROGRESS) {
   
      } else {
        
      }
    }
  };
	

		return (
		<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
			<TouchableOpacity   style={{padding:20,borderWidth:1}}onPress={signIn} >
                <Text>Continue with Google</Text></TouchableOpacity>
	
        </View>
	);
}
export default Signinwithgoogle;