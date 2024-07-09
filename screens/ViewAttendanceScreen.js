import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import BackArrowButton from '../components/BackArrowButton';
import AttendanceCard from '../components/AttendanceCard';

export default function ViewAttendanceScreen({ route }) {
  const { data } = route.params;

  if (data.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No records found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#9933ff" }}>
      <ScrollView>
        <BackArrowButton />
        <View>
          <Text style={{ fontWeight: "900", fontSize: 50, color: "#bfff00", marginLeft: 36, marginTop: 16 }}>Attendance History</Text>
          <View style={{ flexDirection: 'column', padding: 10, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
            {data.map((item, index) => (
              <AttendanceCard key={`${item.attendance_date}-${item.subject}-${index}`} data={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
