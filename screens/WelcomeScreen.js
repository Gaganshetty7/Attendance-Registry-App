import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const navigation=useNavigation();
  return (
    <SafeAreaView  style={{backgroundColor:"#9933ff",flex:1}}>
      <View style={{flex:1, justifyContent:'space-around'}}>
        <Text style={{color:"#bfff00", fontWeight:900, fontSize:60,textAlign:"left",marginHorizontal:28}}>
          Attendance Registry
          </Text>
          <View style={{alignItems:"center"}}>
            <Image source={require('../assets/welcomelogo.png')}
              style={{width:360,height:360}}/>
          </View>
          <View style={{marginVertical: 16}}>
            <TouchableOpacity style={{paddingVertical:12,backgroundColor:"#bfff00",marginHorizontal: 28,borderRadius: 14}}>
              <Text onPress={() =>navigation.navigate("Login")} style={{textAlign:"center",fontWeight:"bold",fontSize:20,color:"#333333"}}>
                Log in
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection:"row",justifyContent:"center",paddingVertical:8}}>
              <Text style={{color:"white"}}>
                Dont have an Account? 
              </Text>
              <TouchableOpacity onPress={() => Alert.alert("Contact Admin","Name: Gagan\nPhone Number:+91 7619637971")}>
              <Text style={{fontWeight:600,color:"#bfff00"}}> Contact Admin</Text>
            </TouchableOpacity>
            </View>
          </View>
      </View>
    </SafeAreaView>
  )
}

