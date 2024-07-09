import { Text, TouchableOpacity, Modal, View } from 'react-native';
import React, { useState } from 'react';

export default function AttendanceCard({ data }) {
  const { attendance_date, subject, absentees_count, absentees } = data;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flexDirection:"row" }}>
    <TouchableOpacity onPress={() => setModalVisible(true)} style={{ margin: 8, backgroundColor: 'white', padding: 15, paddingHorizontal: 22, borderRadius: 30, width: "100%" }}>
      <Text style={{ margin: 5 }}>
        <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc" }}>Date:</Text>
        <Text style={{ fontWeight: 400, fontSize: 16, color: "#af66e0", paddingLeft: 10 }}>  {attendance_date}</Text>
      </Text>
      <Text style={{ margin: 5 }}>
        <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc" }}>Subject:</Text>
        <Text style={{ fontWeight: 400, fontSize: 16, color: "#af66e0" }}>  {subject}</Text>
      </Text>
      <Text style={{ margin: 5 }}>
        <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc" }}>Total Absentees:</Text>
        <Text style={{ fontWeight: 400, fontSize: 16, color: "#af66e0" }}>  {absentees_count !== null ? absentees_count:0}</Text>
      </Text>
    </TouchableOpacity>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <View style={{ backgroundColor: 'white', padding: 25, borderRadius: 30 }}>
          <Text style={{ margin: 5 }}>
            <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc" }}>Date:</Text>
            <Text style={{ fontWeight: 400, fontSize: 16, color: "#af66e0", paddingLeft: 10 }}>  {attendance_date}</Text>
          </Text>
          <Text style={{ margin: 5 }}>
            <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc" }}>Subject:</Text>
            <Text style={{ fontWeight: 400, fontSize: 16, color: "#af66e0" }}>  {subject}</Text>
          </Text>
          <Text style={{ margin: 5 }}>
            <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc" }}>Total Absentees:</Text>
            <Text style={{ fontWeight: 400, fontSize: 16, color: "#af66e0" }}>  {absentees_count !== null ? absentees_count:0}</Text>
          </Text>
          <Text style={{ margin: 5 }}>
            <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc" }}>Total Absentees:</Text>
            <Text style={{ fontWeight: 400, fontSize: 16, color: "#af66e0" }}>  {absentees.join(', ')}</Text>
          </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 10 , justifyContent: 'center', alignItems: 'center', marginHorizontal:65 }}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
