import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const backimg = require('../assets/sdmbgimg.jpg');

  return (
    <ImageBackground source={backimg} style={{flex:1}}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <View style={{flex:1,}}>
            <Text style={{ fontWeight: "900", fontSize: 54, color: "#bfff00", marginLeft: 36 }}>SDMCBM Attendance Registry</Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent:'center',paddingBottom: 30 }}>
              <TouchableOpacity
                style={{ backgroundColor: "#bfff00", padding: 15,paddingHorizontal:30 , borderRadius: 28 }}
                onPress={() => navigation.navigate("MarkAttendance")}
              >
              <Text style={{ color: "#8e1eff", fontWeight: 'bold', fontSize: 20 }}>Mark Attendance</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={{ backgroundColor: "#bfff00", padding: 15, paddingHorizontal:30 , borderRadius: 28, marginTop:15 }}
            onPress={() => navigation.navigate("FilterAttendance")}
            >
              <Text style={{color: "#8e1eff", fontWeight: 'bold', fontSize: 20}}>View Attendance</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={{ backgroundColor: "#bfff00", padding: 15, paddingHorizontal:30 , borderRadius: 28, marginTop:15 }}
            onPress={() => navigation.navigate("AttendancePercentage")}
            >
              <Text style={{color: "#8e1eff", fontWeight: 'bold', fontSize: 20}}>Percentage View</Text>
            </TouchableOpacity>

          </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

