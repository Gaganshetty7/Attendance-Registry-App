import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BackArrowButton2 from '../components/BackArrowButton2';
import api from '../Attbackend/apiBaseUrl';

export default function MarkAttendanceScreen() {
    const navigation = useNavigation();
    const [selectedClassroom, setSelectedClassroom] = useState("");
    const [selectedHour, setSelectedHour] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedLecturer, setSelectedLecturer] = useState("");
    const [selectedAbsentees, setSelectedAbsentees] = useState([]);
    const [students, setStudents] = useState([]);
    const [allsubjects, setAllSubjects] = useState([]);
    const [alllecturers, setAllLecturers] = useState([]);

    //datepicker
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

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

    const hours = [
        { label: '09:00 - 10:00', value: '09:00 - 10:00' },
        { label: '10:00 - 11:00', value: '10:00 - 11:00' },
        { label: '11:00 - 12:00', value: '11:00 - 12:00' },
        { label: '01:00 - 02:00', value: '01:00 - 02:00' },
        { label: '02:00 - 03:00', value: '02:00 - 03:00' },
        { label: '03:00 - 04:00', value: '03:00 - 04:00' }
    ];


    useEffect(() => {
        if (selectedClassroom) {
            fetchStudents(selectedClassroom);
        }
    }, [selectedClassroom]);

    useEffect(() => {
        fetchSubjects();
    }, []);

    useEffect(() => {
        fetchLecturers();
    }, []);
    

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

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://0.0.0.0:3000/api/subjects');
            setAllSubjects(response.data);
        } catch (error) {
            console.error('Error fetching subjects', error);
        }
    };

    const fetchLecturers = async () => {
        try {
            const response = await axios.get('http://0.0.0.0:3000/api/lecturers');
            setAllLecturers(response.data);
        } catch (error) {
            console.error('Error fetching Lecturers', error);
        }
    };

    const handleSubmit = async () => {
        try {
            if (!selectedDate || !selectedClassroom || !selectedHour || !selectedSubject || !selectedLecturer) {
                Alert.alert("Selections Missing", "Select options from all the fields before submitting!!");
                return;
            }
            
            const attendancedata = {
                date: selectedDate.toISOString().substring(0, 10),
                classroom: selectedClassroom,
                hour: selectedHour,
                subject: selectedSubject,
                lecturer: selectedLecturer,
                absentees: selectedAbsentees 
            };

            const response = await axios.post('http://0.0.0.0:3000/api/attendance', attendancedata);

            Alert.alert("Attendance Submitted Successfully!!");
            
            setSelectedDate(null);
            setSelectedClassroom("");
            setSelectedHour("");
            setSelectedSubject("");
            setSelectedLecturer("");
            setSelectedAbsentees([]);
        } catch (error) {
            console.error("Error submitting attendance:", error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#bfff00" }}>
            <ScrollView nestedScrollEnabled={true}>
                <SafeAreaView>
                    <BackArrowButton2 style={{backgroundColor:"#7a00cc"}}/>
                    <Text style={{ fontWeight: "900", fontSize: 50, color: "#7a00cc", marginLeft: 36, marginTop: 16 }}>Collect Attendance</Text>
                </SafeAreaView>
                <View style={{
                    margin:20,
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 50,
                    paddingHorizontal: 25,
                    flexDirection: "column"
                }}>
                    <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc", marginBottom: 6, marginTop: 15, marginLeft: 8 }}>Date</Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start'}}>
                        <TouchableOpacity onPress={showDatePicker} style={{backgroundColor:"white", borderWidth: 2, borderRadius: 30, padding:12, borderColor:"grey", paddingHorizontal:20}}>
                            <Text style={{color: "#7a00cc"}}>{selectedDate ? selectedDate.toDateString() : "Enter Date"}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
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
                    <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc", marginBottom: 6, marginTop: 15, marginLeft: 8 }}>Hour</Text>
                    <SelectList
                        setSelected={(value) => setSelectedHour(value)}
                        data={hours}
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
                    <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc", marginBottom: 6, marginTop: 15, marginLeft: 8 }}>Lecturer</Text>
                    <SelectList
                        setSelected={(value) => setSelectedLecturer(value)}
                        data={alllecturers.map(lecturer_total => ({ key: lecturer_total.name, value: lecturer_total.name }))}
                        save="value"
                        search={false}
                        boxStyles={{ backgroundColor: "white", borderRadius: 30, borderWidth: 2 }}
                        dropdownStyles={{ backgroundColor: "white" }}
                        inputStyles={{ color: "#7a00cc" }}
                        dropdownTextStyles={{ color: "#7a00cc" }}
                    />
                    <Text style={{ fontWeight: 600, fontSize: 18, color: "#7a00cc", marginBottom: 6, marginTop: 15, marginLeft: 8 }}>Absentees</Text>
                        <MultipleSelectList
                            setSelected={(value) => setSelectedAbsentees(value)}
                            data={students.map(student => ({ key: student.stud_regno, value: student.stud_regno }))}
                            save={selectedAbsentees}
                            placeholder="Select Absentees"
                            search={true}
                            boxStyles={{ borderWidth: 2, borderRadius: 30 }}
                            inputStyles={{ color: "#7a00cc" }}
                            dropdownStyles={{ maxHeight: 160 }}
                        />
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity style={{ backgroundColor: "#7a00cc",
                                                   padding: 10,
                                                   paddingHorizontal: 22,
                                                   alignItems: "center",
                                                   borderRadius: 20, marginTop: 15}}
                                                   onPress={()=>{[handleSubmit(), navigation.goBack()]}}>
                            <Text style={{ fontSize: 20 , color:"white"}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}