import { View,TouchableOpacity, Text} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function BackArrowButton() {
    const navigation=useNavigation();
  return (
    <View style={{flexDirection:"row", justifyContent:'start'}}>
          <TouchableOpacity onPress={()=>navigation.goBack()} style={{backgroundColor:"#bfff00",
                                    paddingVertical:8,
                                    paddingHorizontal:10,
                                    borderTopRightRadius:15,
                                    borderBottomLeftRadius:15,
                                    marginLeft:16,
                                    marginTop:4
                                    }}>
            <Text style={{ fontSize: 20, fontWeight:800,color:"#7a00cc" }}>≪</Text>
          </TouchableOpacity>
        </View>
  )
}