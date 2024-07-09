import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BackArrowButton from '../components/BackArrowButton';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [selectedEmail, setSelectedEmail] = useState("");
    const [selectedPassword, setSelectedPassword] = useState("");

    const handleLogin = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!selectedEmail || !selectedPassword) {
            Alert.alert("Please enter valid E-mail and Password");
            return;
        } else if (!emailRegex.test(selectedEmail)) {
            Alert.alert("Please enter a valid E-mail address");
            return;
        }

        try {
            const response = await axios.get('http://0.0.0.0:3000/api/logindata', {
                params: {
                    email: selectedEmail,
                    password: selectedPassword
                }
            });
            console.log("Login response:", response.data);
            if (response.data.success) {
                navigation.navigate("Home");
            } else {
                Alert.alert("User with entered e-mail address or password does not exist.");
            }

        } catch (error) {
            console.error("Error Logging in", error);
            Alert.alert("Error Logging in. Please try again later!");
        }
    };

    return (
        <KeyboardAvoidingWrapper>
            <View style={{ flex: 1, backgroundColor: "#9933ff" }}>
                <SafeAreaView>
                    <BackArrowButton />
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Image source={require('../assets/loginlogo.png')} style={{ width: 300, height: 300 }} />
                    </View>
                    <Text style={{ margin: 18, fontSize: 36, fontWeight: 'bold', textAlign: "center", color: "#bfff00" }}>Login Form</Text>
                </SafeAreaView>

                <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 32, paddingTop: 32, borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                    <View style={{ display: "flex", flexDirection: "column" }}>
                        <Text style={{ color: "#1a1a1a", fontWeight: '500', marginLeft: 16, marginBottom: 8 }}>Email Address</Text>
                        <TextInput
                            style={{ backgroundColor: "#f2f2f2", padding: 10, borderRadius: 16, color: "#262626" }}
                            placeholder="Enter your Email Address"
                            autoCapitalize="none"
                            onChangeText={(value) => setSelectedEmail(value)}
                            value={selectedEmail}
                        />

                        <Text style={{ color: "#1a1a1a", fontWeight: '500', marginLeft: 16, marginBottom: 8, marginTop: 8 }}>Password</Text>
                        <TextInput
                            style={{ backgroundColor: "#f2f2f2", padding: 10, borderRadius: 16, color: "#262626" }}
                            placeholder="Enter the Password"
                            secureTextEntry
                            onChangeText={(value) => setSelectedPassword(value)}
                            value={selectedPassword}
                        />
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                        <TouchableOpacity style={{ marginTop: 5, marginRight: 16 }} onPress={() => Alert.alert("Contact Admin", "Name: Gagan\nPhone Number:+91 7619637971")}>
                            <Text style={{ fontWeight: '500', color: "#59b300", fontSize: 12 }}> Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 20 }}>
                        <TouchableOpacity style={{ paddingVertical: 12, backgroundColor: "#bfff00", marginHorizontal: 20, borderRadius: 16 }} onPress={handleLogin}>
                            <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, color: "#333333" }}>
                                Log in
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center", paddingVertical: 8 }}>
                        <Text style={{ color: "#262626" }}>
                            Don't have an Account?
                        </Text>
                        <TouchableOpacity onPress={() => Alert.alert("Contact Admin", "Name: Gagan\nPhone Number:+91 7619637971")}>
                            <Text style={{ fontWeight: '600', color: "#59b300" }}> Contact Admin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingWrapper>
    )
}
