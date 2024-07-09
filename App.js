import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MarkAttendanceScreen from './screens/MarkAttendanceScreen';
import ViewAttendanceScreen from './screens/ViewAttendanceScreen';
import FilterAttendanceScreen from './screens/FilterAttendanceScreen';
import AttendancePercentageScreen from './screens/AttendancePercentageScreen';
import ViewAttendancePercentageScreen from './screens/ViewAttendancePercentageScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' >
            <Stack.Screen name="Welcome" options={{headerShown:false}} component={WelcomeScreen}/>
            <Stack.Screen name="Login" options={{headerShown:false}} component={LoginScreen}/>
            <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen}/>
            <Stack.Screen name="MarkAttendance" options={{headerShown:false}} component={MarkAttendanceScreen}/>
            <Stack.Screen name="FilterAttendance" options={{headerShown:false}} component={FilterAttendanceScreen}/>
            <Stack.Screen name="ViewAttendance" options={{headerShown:false}} component={ViewAttendanceScreen}/>
            <Stack.Screen name="AttendancePercentage" options={{headerShown:false}} component={AttendancePercentageScreen}/>
            <Stack.Screen name="ViewAttendancePercentage" options={{headerShown:false}} component={ViewAttendancePercentageScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}