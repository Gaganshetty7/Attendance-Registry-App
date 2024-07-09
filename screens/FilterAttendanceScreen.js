import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackArrowButton2 from '../components/BackArrowButton2';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SelectList } from 'react-native-dropdown-select-list';

export default function FilterAttendanceScreen() {
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [allsubjects, setAllSubjects] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const classroom = [
    { label: 'I BCA A', value: 'I BCA A' },
    { label: 'I BCA B', value: 'I BCA B' },
    { label: 'II BCA A', value: 'II BCA A' },
    { label: 'II BCA B', value: 'II BCA B' },
    { label: 'III BCA A', value: 'III BCA A' },
    { label: 'III BCA B', value: 'III BCA B' }
];

useEffect(() => {
  fetchSubjects();
}, []);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedSubject || !selectedClassroom) {
      Alert.alert("Please select from all the fields");
      return;
    }
    try {
      const response = await axios.get('http://0.0.0.0:3000/api/viewattendance', {
        params: {
          date: selectedDate.toISOString().substring(0, 10),
          subject: selectedSubject,
          classroom: selectedClassroom
        }
      });

      if (response.data.length > 0) {
        navigation.navigate("ViewAttendance", { data: response.data });
      } else {
        Alert.alert("No records found.");
      }

    } catch (error) {
      console.error("Error filtering attendance:", error);
      Alert.alert("Error filtering attendance. Please try again.");
    }
  };

  const fetchSubjects = async () => {
    try {
        const response = await axios.get('http://0.0.0.0:3000/api/subjects');
        setAllSubjects(response.data);
    } catch (error) {
        console.error('Error fetching subjects', error);
    }
};

  return (
    <View style={{ flex: 1, backgroundColor: "#bfff00" }}>
      <SafeAreaView>
        <BackArrowButton2 />
        <Text style={{ fontWeight: "900", fontSize: 50, color: "#7a00cc", marginLeft: 36, marginTop: 16 }}>Filter Attendance</Text>
      </SafeAreaView>

      <View style={{ backgroundColor: "white", margin: 20, borderRadius: 50, padding: 20, flexDirection: "column" }}>

        <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc", marginBottom: 6, marginTop: 15, marginLeft: 8 }}>Date</Text>
        <TouchableOpacity onPress={showDatePicker} style={{ backgroundColor: "white", borderWidth: 2, borderRadius: 30, padding: 12, borderColor: "grey", paddingHorizontal: 20 }}>
          <Text style={{ color: "#7a00cc" }}>{selectedDate ? selectedDate.toDateString() : "Enter Date"}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc", marginBottom: 6, marginTop: 15, marginLeft: 8 }}>Class</Text>
          <SelectList
              setSelected={(value) => setSelectedClassroom(value)}
              data={classroom}
              save="value"
              search={false}
              boxStyles={{ backgroundColor: "white", borderRadius: 30, borderWidth: 2 }}
              dropdownStyles={{ backgroundColor: "white" }}
              inputStyles={{ color: "#7a00cc" }}
              dropdownTextStyles={{ color: "#7a00cc" }}
          />

        <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc", marginBottom: 6, marginTop: 15, marginLeft: 8 }}>Subject</Text>
        <SelectList
          setSelected={(value) => setSelectedSubject(value)}
          data={allsubjects.map(subject_total => ({ key: subject_total.subject, value: subject_total.subject }))}
          save="value"
          search={false}
          boxStyles={{ backgroundColor: "white", borderRadius: 30, borderWidth: 2 }}
          dropdownStyles={{ backgroundColor: "white" }}
          inputStyles={{ color: "#7a00cc" }}
          dropdownTextStyles={{ color: "#7a00cc" }}
        />

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity style={{ backgroundColor: "#7a00cc",
                                      padding: 10,
                                      paddingHorizontal: 22,
                                      alignItems: "center",
                                      borderRadius: 20, marginTop: 15}}
                                      onPress={handleSubmit}>
              <Text style={{ fontSize: 20 , color:"white"}}>Submit</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}
