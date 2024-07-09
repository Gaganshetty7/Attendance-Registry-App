import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Example = () => {
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

  return (
    <View style={{ alignItems: "center" }}>
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
  );
};

export default Example;
