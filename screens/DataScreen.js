import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import {
  Hospital,
  Lightbulb,
  Activity,
  Heart,
  Beaker,
  Globe,
  Trash,
  Edit2,
  Save,
  Microscope,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const DataScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("Clinical");
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchData = async (category) => {
    try {
      const jsonValue = await AsyncStorage.getItem("formData");
      const formData = jsonValue != null ? JSON.parse(jsonValue) : [];

      let filteredData = formData;
      if (category !== "Total") {
        filteredData = formData.filter((item) => item.category === category);
      }

      // Reverse the order of data to show the newest data at the top
      setData(filteredData.reverse());
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(selectedCategory);
    }, [selectedCategory])
  );

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

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

  const handleDelete = async (id) => {
    try {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      const existingData = await AsyncStorage.getItem("formData");
      const formData = existingData ? JSON.parse(existingData) : [];
      const newFormData = formData.filter((item) => item.id !== id);
      await AsyncStorage.setItem("formData", JSON.stringify(newFormData));
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const itemToEdit = data.find((item) => item.id === id);
    setEditedValues({
      name: itemToEdit.name,
      number: itemToEdit.number,
      email: itemToEdit.email,
    });
  };

  const handleSave = async (id) => {
    try {
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, ...editedValues } : item
      );
      setData(updatedData);
      await AsyncStorage.setItem("formData", JSON.stringify(updatedData));
      setEditingId(null);
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  const handleChange = (field, value) => {
    setEditedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    StatusBar.setHidden(false);

    return () => {
      StatusBar.setHidden(false); // Ensure it shows when navigating away
    };
  }, [isDarkMode]);

  const renderDataItem = (label, value, editable, field) => {
    if (!value && !editable) return null;

    return (
      <View style={isDarkMode ? styles.dataItemDark : styles.dataItem}>
        <Text style={isDarkMode ? styles.labelDark : styles.label}>
          {label}:
        </Text>
        {editable ? (
          <TextInput
            style={isDarkMode ? styles.inputDark : styles.input}
            value={editedValues[field]}
            onChangeText={(text) => handleChange(field, text)}
          />
        ) : (
          <Text style={isDarkMode ? styles.valueDark : styles.value}>
            {value}
          </Text>
        )}
      </View>
    );
  };
  const categories = [
    { name: "Clinical", icon: <Hospital color={"white"} /> },
    { name: "Extracurricular", icon: <Lightbulb color={"white"} /> },
    { name: "Shadowing", icon: <Activity color={"white"} /> },
    { name: "Volunteer", icon: <Heart color={"white"} /> },
    { name: "Research", icon: <Microscope color={"white"} /> },
    { name: "Total", icon: <Globe color={"white"} /> },
  ];

  const categoryIcons = {
    Clinical: <Hospital color={isDarkMode ? "white" : "#444"} size={20} />,
    Extracurricular: (
      <Lightbulb color={isDarkMode ? "white" : "#444"} size={20} />
    ),
    Shadowing: <Activity color={isDarkMode ? "white" : "#444"} size={20} />,
    Volunteer: <Heart color={isDarkMode ? "white" : "#444"} size={20} />,
    Research: <Microscope color={isDarkMode ? "white" : "#444"} size={20} />,
    Total: <Globe color={isDarkMode ? "white" : "#444"} size={20} />,
  };
  const categoryCardIcons = {
    Clinical: <Hospital color={"#EEAAEA"} size={20} strokeWidth={1} />,
    Extracurricular: <Lightbulb color={"#EEAAEA"} size={20} strokeWidth={1} />,
    Shadowing: <Activity color={"#EEAAEA"} size={20} strokeWidth={1} />,
    Volunteer: <Heart color={"#EEAAEA"} size={20} strokeWidth={1} />,
    Research: <Microscope color={"#EEAAEA"} size={20} strokeWidth={1} />,
    Total: <Globe color={"#EEAAEA"} size={20} strokeWidth={1} />,
  };
  return (
    <>
      {isDarkMode === false && (
        <LinearGradient colors={["#94bbe9", "#eeaeca"]} style={styles.gradient}>
          <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.buttonRow}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.name}
                    style={[
                      styles.button,
                      selectedCategory === category.name &&
                        styles.buttonSelected,
                    ]}
                    onPress={() => setSelectedCategory(category.name)}
                  >
                    {category.icon}
                    <Text style={styles.buttonText}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {data.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.dataContainer}>
                    {renderDataItem(
                      "Name",
                      item.name,
                      editingId === item.id,
                      "name"
                    )}
                    {renderDataItem(
                      "Hours",
                      item.number,
                      editingId === item.id,
                      "number"
                    )}
                    {renderDataItem(
                      "Date Started",
                      new Date(item.date).toLocaleDateString()
                    )}
                    {renderDataItem(
                      "Date Started",
                      new Date(item.time).toLocaleDateString()
                    )}
                  </View>
                  <View style={styles.dataContainer}>
                    {renderDataItem(
                      "Email",
                      item.email,
                      editingId === item.id,
                      "email"
                    )}
                    {renderDataItem("Description", item.extra)}
                    {renderDataItem("Institution Name", item.extrafieldone)}
                  </View>
                  <View style={styles.cardActions}>
                    {editingId === item.id ? (
                      <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => handleSave(item.id)}
                      >
                        <Save size={20} color="#FFFFFF" />
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(item.id)}
                    >
                      <Trash size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.iconContainer}>
                    {categoryIcons[item.category]}
                  </View>
                  <Text style={styles.categoryTitle}>{item.category}</Text>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      )}
      {isDarkMode && (
        <LinearGradient colors={["#181818", "#181818"]} style={styles.gradient}>
          <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.buttonRow}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.name}
                    style={[
                      styles.buttonDark,
                      selectedCategory === category.name &&
                        styles.buttonSelectedDark,
                    ]}
                    onPress={() => setSelectedCategory(category.name)}
                  >
                    {category.icon}
                    <Text style={styles.buttonText}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {data.map((item) => (
                <View key={item.id} style={styles.cardDark}>
                  <View style={styles.dataContainer}>
                    {renderDataItem(
                      "Name",
                      item.name,
                      editingId === item.id,
                      "name"
                    )}
                    {renderDataItem(
                      "Hours",
                      item.number,
                      editingId === item.id,
                      "number"
                    )}
                    {renderDataItem(
                      "Date",
                      new Date(item.date).toLocaleDateString()
                    )}
                  </View>
                  <View style={styles.dataContainer}>
                    {renderDataItem(
                      "Email",
                      item.email,
                      editingId === item.id,
                      "email"
                    )}
                    {renderDataItem("Description", item.extra)}
                    {renderDataItem("Institution Name", item.extrafieldone)}
                  </View>
                  <View style={styles.cardActions}>
                    {editingId === item.id ? (
                      <TouchableOpacity
                        style={styles.saveButtonDark}
                        onPress={() => handleSave(item.id)}
                      >
                        <Save size={20} color="#FFFFFF" />
                      </TouchableOpacity>
                    ) : (
                      // <TouchableOpacity
                      //   style={styles.editButtonDark}
                      //   onPress={() => handleEdit(item.id)}
                      // >
                      //   <Edit2 size={20} color="#EEAAEA" />
                      // </TouchableOpacity>
                      <></>
                    )}
                    <TouchableOpacity
                      style={styles.deleteButtonDark}
                      onPress={() => handleDelete(item.id)}
                    >
                      <Trash size={20} color="#FF6666" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.iconContainer}>
                    {categoryCardIcons[item.category]}
                  </View>
                  <Text style={styles.categoryTitleDark}>{item.category}</Text>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    margin: 5,
    backgroundColor: "#529bbb",
    borderRadius: 5,
  },
  buttonDark: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    margin: 5,
    backgroundColor: "#3E3E3E",
    borderRadius: 5,
  },
  buttonSelected: {
    backgroundColor: "#eeaeca",
  },
  buttonSelectedDark: {
    backgroundColor: "#EEAAEA",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
    paddingBottom: 100, // Add extra padding at the bottom to avoid being hidden by the tab bar
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "100",
    marginTop: -20,
    textAlign: "center",
  },
  categoryTitleDark: {
    fontSize: 16,
    fontWeight: "100",
    marginTop: -20,
    textAlign: "center",
    color: "#EEAAEA",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position: "relative",
  },
  cardDark: {
    backgroundColor: "#232323",
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position: "relative",
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginHorizontal: -5, // Negative margin to compensate for padding in dataItem
  },
  dataItem: {
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  dataItemDark: {
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#3E3E3E",
    color: "#FFF",
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  labelDark: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
  },
  value: {
    fontSize: 14,
    textAlign: "center",
  },
  valueDark: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    fontSize: 14,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    padding: 5,
  },
  inputDark: {
    fontSize: 14,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    padding: 5,
    color: "#fff",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonDark: {
    backgroundColor: "#3E3E3E",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: "#5bc0de",
    padding: 10,
    borderRadius: 5,
  },
  editButtonDark: {
    backgroundColor: "#3E3E3E",
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#5cb85c",
    padding: 10,
    borderRadius: 5,
  },
  saveButtonDark: {
    backgroundColor: "#3E3E3E",
    padding: 10,
    borderRadius: 5,
  },
  iconContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
});

export default DataScreen;
