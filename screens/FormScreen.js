import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";
import DateTimePickerButton from "../components/DateTimePicker";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Enter a valid email"),
  location: Yup.string(),
  number: Yup.number().required("Number is required"),
  category: Yup.string().required("Category is required"),
  extrafieldtwo: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

// Simple ID generator
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
};

const FormScreen = ({ navigation }) => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const existingData = await AsyncStorage.getItem("formData");
      const formData = existingData ? JSON.parse(existingData) : [];
      values.id = generateId(); // Add a unique ID to each form entry
      formData.push(values);
      await AsyncStorage.setItem("formData", JSON.stringify(formData));
      resetForm();
      navigation.navigate("Data");
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

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
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const [isChecked, setIsChecked] = useState(false);

  // Get the height of the tab bar dynamically
  const tabBarHeight = Platform.OS === "ios" ? 50 : 60; // Adjust as per your tab bar height

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={isDarkMode ? styles.containerDark : styles.container}
      >
        <Formik
          initialValues={{
            name: "",
            email: "",
            number: "",
            category: "Clinical",
            date: new Date(),
            time: new Date(),
            extra: "",
            extrafieldone: "",
            extrafieldtwo: "",
            extrafieldthree: "",
            extrafieldfour: "",
            location: "",
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <ScrollView
              contentContainerStyle={{
                ...styles.scrollContainer,
                paddingBottom: tabBarHeight, // Ensure content is above tab bar
              }}
              keyboardShouldPersistTaps="handled" // Persist keyboard dismiss on tap
            >
              <View style={isDarkMode ? styles.formDark : styles.form}>
                <Text style={isDarkMode ? styles.labelDark : styles.label}>
                  Category <Text style={{ color: "red" }}>*</Text>
                </Text>
                <RNPickerSelect
                  onValueChange={(value) => setFieldValue("category", value)}
                  items={[
                    { label: "Clinical", value: "Clinical" },
                    { label: "Extracurricular", value: "Extracurricular" },
                    { label: "Shadowing", value: "Shadowing" },
                    { label: "Volunteer", value: "Volunteer" },
                    { label: "Research", value: "Research" },
                  ]}
                  style={{
                    inputIOS: isDarkMode ? styles.pickerDark : styles.picker,
                    inputAndroid: styles.picker,
                    placeholder: { color: "#ccc" },
                  }}
                  value={values.category}
                />
                {errors.category && touched.category ? (
                  <Text style={styles.error}>{errors.category}</Text>
                ) : null}

                <Text style={isDarkMode ? styles.labelDark : styles.label}>
                  Hours <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={isDarkMode ? styles.inputDark : styles.input}
                  onChangeText={handleChange("number")}
                  onBlur={handleBlur("number")}
                  value={values.number}
                  keyboardType="numeric"
                />
                {errors.number && touched.number ? (
                  <Text style={styles.error}>{errors.number}</Text>
                ) : null}

                <Text style={isDarkMode ? styles.labelDark : styles.label}>
                  Activity Name <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={isDarkMode ? styles.inputDark : styles.input}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <Text style={styles.error}>{errors.name}</Text>
                ) : null}

                <Text style={isDarkMode ? styles.labelDark : styles.label}>
                  Location/Institution
                </Text>
                <TextInput
                  style={isDarkMode ? styles.inputDark : styles.input}
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  value={values.location}
                />
                {errors.location && touched.location ? (
                  <Text style={styles.error}>{errors.location}</Text>
                ) : null}

                <Text style={isDarkMode ? styles.labelDark : styles.label}>
                  Description
                </Text>
                <TextInput
                  style={[
                    isDarkMode ? styles.inputDark : styles.input,
                    { minHeight: 40, height: "auto" },
                  ]}
                  onChangeText={handleChange("extra")}
                  onBlur={handleBlur("extra")}
                  value={values.extra}
                  multiline={true}
                />

                <View style={styles.dateTimeContainer}>
                  <View style={styles.dateTimeInput}>
                    <Text style={isDarkMode ? styles.labelDark : styles.label}>
                      Start Date <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    {/* <DateTimePicker
                      value={values.date}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setFieldValue("date", selectedDate);
                      }}
                      style={{
                        padding: -10,
                        backgroundColor: "#3E3E3E",
                        color: "white",
                      }}
                    /> */}
                    <DateTimePickerButton
                      value={values.date}
                      onChange={(event, selectedDate) => {
                        setFieldValue("date", selectedDate);
                      }}
                      styles={
                        isDarkMode
                          ? {
                              padding: -10,
                              backgroundColor: "#232323",
                              color: "white",
                            }
                          : {
                              padding: -10,
                              backgroundColor: "#FFF",
                              color: "white",
                            }
                      }
                    />
                  </View>

                  {isChecked === false && (
                    <>
                      <View style={styles.dateTimeInput}>
                        <Text
                          style={isDarkMode ? styles.labelDark : styles.label}
                        >
                          End Date
                        </Text>
                        <DateTimePickerButton
                          value={values.time}
                          onChange={(event, selectedDate) => {
                            setFieldValue("time", selectedDate);
                          }}
                          styles={{
                            marginLeft: -10,
                            padding: -10,
                            backgroundColor: "#3E3E3E",
                            color: "white",
                          }}
                        />
                        {/* <DateTimePicker
                          value={values.time}
                          mode="date"
                          display="default"
                          onChange={(event, selectedDate) => {
                            setFieldValue("time", selectedDate);
                          }}
                          style={{
                            marginLeft: -10,
                            padding: -10,
                            backgroundColor: "#3E3E3E",
                            color: "white",
                          }}
                        /> */}
                      </View>
                    </>
                  )}
                </View>
                {/* Checkbox */}
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    checked={isChecked}
                    onPress={() => setIsChecked(!isChecked)}
                    containerStyle={styles.checkbox}
                    checkedColor="#EEAAEA"
                  />
                  <Text
                    style={
                      isDarkMode
                        ? styles.checkboxLabelDark
                        : styles.checkboxLabel
                    }
                  >
                    In progress
                  </Text>
                </View>
                <Button onPress={handleSubmit} title="Submit" />
                <Button
                  onPress={toggleExpanded}
                  title={
                    expanded
                      ? "Hide Additional Fields"
                      : "Show Additional Fields"
                  }
                />

                {expanded && (
                  <>
                    <Text style={isDarkMode ? styles.labelDark : styles.label}>
                      Institution Email
                    </Text>
                    <TextInput
                      style={isDarkMode ? styles.inputDark : styles.input}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <Text style={styles.error}>{errors.email}</Text>
                    ) : null}

                    <Text style={isDarkMode ? styles.labelDark : styles.label}>
                      Institution Phone Number
                    </Text>
                    <TextInput
                      style={isDarkMode ? styles.inputDark : styles.input}
                      onChangeText={handleChange("extrafieldtwo")}
                      onBlur={handleBlur("extrafieldtwo")}
                      value={values.extrafieldtwo}
                      keyboardType="numeric"
                    />
                    {errors.extrafieldtwo && touched.extrafieldtwo ? (
                      <Text style={styles.error}>{errors.extrafieldtwo}</Text>
                    ) : null}
                  </>
                )}

                <Text>
                  <Text style={{ color: "red" }}>* Required</Text>
                </Text>
              </View>
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  containerDark: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#181818",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -150,
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    maxWidth: 400,
  },
  formDark: {
    backgroundColor: "#232323",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    maxWidth: 400,
    color: "white",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  labelDark: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  inputDark: {
    height: 40,
    backgroundColor: "#3E3E3E",
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    color: "white",
  },
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  pickerDark: {
    height: 40,
    backgroundColor: "#3E3E3E",
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    color: "white",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dateTimeInput: {
    flex: 1,
    alignItems: "flex-start", // Align items to the left
  },
  dateTimeInputDark: {
    flex: 1,
    backgroundColor: "#3E3E3E",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    padding: 0,
    margin: 0,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  checkboxLabelDark: {
    marginLeft: 10,
    color: "white",
  },
  dateTimePickerDark: {
    color: "white",
  },
});

export default FormScreen;
