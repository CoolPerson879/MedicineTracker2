import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  Platform,
  Button,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DateTimePickerPopup = ({ value, onChange, styles }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
    // Pass the selected date to the parent component via onChange prop
    onChange(event, currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const hideDatepicker = () => {
    setShowPicker(false);
  };

  useEffect(() => {
    const checkDarkModeStatus = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("isDark");
        if (jsonValue != null) {
          const darkMode = JSON.parse(jsonValue);
          setIsDarkMode(darkMode);
        } else {
          console.log("no theme settings found!");
        }
      } catch (error) {
        console.error("Error checking dark mode status", error);
      }
    };

    checkDarkModeStatus();
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Format date to display only date without time
  const formattedDate = date.toLocaleDateString();

  return (
    <>
      {isDarkMode && (
        <View style={Styles.container}>
          <TouchableOpacity onPress={showDatepicker} style={Styles.button}>
            <Text numberOfLines={1} style={Styles.buttonText}>
              {formattedDate}
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showPicker}
            onRequestClose={hideDatepicker}
          >
            <View style={Styles.modalContainer}>
              <View style={Styles.modalContent}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={value}
                  mode="date"
                  display="spinner"
                  onChange={onDateChange} // Pass onDateChange function here
                  textColor="#ffffff" // Set text color for dark mode
                  style={styles} // Optional styling for DateTimePicker
                />
                <Button
                  title="Close"
                  onPress={hideDatepicker}
                  color="#ffffff"
                />
              </View>
            </View>
          </Modal>
        </View>
      )}
      {isDarkMode === false && (
        <View style={Styles.container}>
          <TouchableOpacity onPress={showDatepicker} style={Styles.buttonLight}>
            <Text numberOfLines={1} style={Styles.buttonTextLight}>
              {formattedDate}
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showPicker}
            onRequestClose={hideDatepicker}
          >
            <View style={Styles.modalContainer}>
              <View style={Styles.modalContentLight}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={value}
                  mode="date"
                  display="spinner"
                  onChange={onDateChange} // Pass onDateChange function here
                  textColor="#000" // Set text color for dark mode
                  style={styles} // Optional styling for DateTimePicker
                />
                <Button title="Close" onPress={hideDatepicker} color="#000" />
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    justifyContent: "flex-start",
  },
  button: {
    backgroundColor: "#3E3E3E", // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded corners
    minWidth: 120, // Set minimum width for the button
    maxWidth: Dimensions.get("window").width - 40, // Adjust button width dynamically based on screen width
  },
  buttonLight: {
    backgroundColor: "#EEE", // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded corners
    minWidth: 120, // Set minimum width for the button
    maxWidth: Dimensions.get("window").width - 40, // Adjust button width dynamically based on screen width
  },
  buttonText: {
    color: "#ffffff", // Button text color
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center", // Center align text
  },
  buttonTextLight: {
    color: "#333333", // Button text color
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center", // Center align text
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#232323", // Dark mode modal content background color
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContentLight: {
    backgroundColor: "#FFF", // Dark mode modal content background color
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContent: {
    backgroundColor: "#232323", // Dark mode modal content background color
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default DateTimePickerPopup;
