import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react'
import BackArrowButton2 from '../components/BackArrowButton2';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';

export default function AttendancePercentageScreen() {
    const navigation = useNavigation();
    const [selectedClassroom, setSelectedClassroom] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedAbsentees, setSelectedAbsentees] = useState([]);
    const [students, setStudents] = useState([]);
    const [allsubjects, setAllSubjects] = useState([]);

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

    useEffect(() => {
        if (selectedClassroom) {
            fetchStudents(selectedClassroom);
        }
    }, [selectedClassroom]);

    const fetchStudents = async (classroom) => {
        try {
            const response = await axios.get('http://0.0.0.0:3000/api/students', {
                params: { classroom }
            });
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students', error);
        }
    };

    const handleSubmit = async () => {
        if (!selectedClassroom || !selectedAbsentees || !selectedSubject) {
          Alert.alert("Please select from all the fields");
          return;
        }
        try {
          const response = await axios.get('http://0.0.0.0:3000/api/attendancepercentage', {
            params: {
              classroom: selectedClassroom,
              subject: selectedSubject,
              absentees: selectedAbsentees
            }
          });
    
          if (response.data.length > 0) {
            navigation.navigate("ViewAttendancePercentage", { data: response.data });
          } else {
            Alert.alert("No records found.");
          }
    
        } catch (error) {
          console.error("Error filtering attendance perc:", error);
          Alert.alert("Error filtering attendance perc. Please try again.");
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
        <Text style={{ fontWeight: "900", fontSize: 50, color: "#7a00cc", marginLeft: 36, marginTop: 16 }}>Student Details</Text>
      </SafeAreaView>

        <View style={{ backgroundColor: "white", margin: 20, borderRadius: 50, padding: 20, flexDirection: "column" }}>

            <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc", marginBottom: 6, marginTop: 15, marginLeft: 8 }}>Class</Text>
            <SelectList
              setSelected={(value) => setSelectedClassroom(value)}
              data={classroom}
              save="value"
              placeholder="Select Class"
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

            <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc", marginBottom: 6, marginTop: 15, marginLeft: 8 }}>Student Register number</Text>
            <SelectList
                setSelected={(value) => setSelectedAbsentees(value)}
                data={students.map(student => ({ key: student.stud_regno, value: student.stud_regno }))}
                save={selectedAbsentees}
                placeholder="Select Absentees"
                search={true}
                boxStyles={{ borderWidth: 2, borderRadius: 30 }}
                inputStyles={{ color: "#7a00cc" }}
                dropdownStyles={{ maxHeight: 160 }}
                dropdownTextStyles={{ color: "#7a00cc" }}
            />

            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity style={{ backgroundColor: "#7a00cc",
                                            padding: 10,
                                            paddingHorizontal: 22,
                                            alignItems: "center",
                                            borderRadius: 20, marginTop: 20}}
                                            onPress={()=>{handleSubmit()}}>
                    <Text style={{ fontSize: 20 , color:"white"}}>Submit</Text>
                </TouchableOpacity>
            </View>

        </View>
    </View>
  )
}