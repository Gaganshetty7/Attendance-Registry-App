import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import BackArrowButton from '../components/BackArrowButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ViewAttendancePercentageScreen({ route }) {
    const { data } = route.params;

    if (data.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No records found.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#9933ff" }}>
            <SafeAreaView>
                <BackArrowButton />
            </SafeAreaView>
            <View>
                <Text style={{ fontWeight: "900", fontSize: 50, color: "#bfff00", marginLeft: 36, marginTop: 16 }}>Attendance Percentage</Text>
                <ScrollView>
                    {data.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'column', padding: 10, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={{ margin: 8, backgroundColor: 'white', padding: 15, paddingHorizontal: 22, borderRadius: 30, width: "100%" }}>
                                    <Text style={{ margin: 5 }}>
                                        <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc" }}>Reg Number:</Text>
                                        <Text style={{ fontWeight: 400, fontSize: 16, color: "#af66e0", paddingLeft: 10 }}> {(item.absentee)}</Text>
                                    </Text>
                                    <Text style={{ margin: 5 }}>
                                        <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc" }}>Subject:</Text>
                                        <Text style={{ fontWeight: 400, fontSize: 16, color: "#af66e0", paddingLeft: 10 }}> {(item.subject)}</Text>
                                    </Text>
                                    <Text style={{ margin: 5 }}>
                                        <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc" }}>Attendance Percentage:</Text>
                                        <Text style={{ fontWeight: 400, fontSize: 16, color: "#af66e0", paddingLeft: 10 }}> {(item.attendance_percentage.toFixed(2))}%</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}
