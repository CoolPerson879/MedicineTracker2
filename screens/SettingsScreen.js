import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo icons

// Image source (replace with your actual image source path)
const imageSource = require("../assets/logo.png");

const SettingsScreen = () => {
  const [isDark, setIsDark] = useState(false);
  const [isLight, setIsLight] = useState(false);

  // Load initial state from AsyncStorage on component mount
  useEffect(() => {
    loadCheckedState();
  }, []);

  // Function to load checked state from AsyncStorage
  const loadCheckedState = async () => {
    try {
      const darkMode = await AsyncStorage.getItem("isDark");
      const lightMode = await AsyncStorage.getItem("isLight");
      if (darkMode !== null) {
        setIsDark(JSON.parse(darkMode));
      }
      if (lightMode !== null) {
        setIsLight(JSON.parse(lightMode));
      }
    } catch (error) {
      console.error("Error loading checked state from AsyncStorage:", error);
    }
  };

  // Function to toggle dark mode
  const toggleDarkMode = async () => {
    try {
      setIsDark((prevState) => !prevState); // Toggle isDark state
      await AsyncStorage.setItem("isDark", JSON.stringify(!isDark)); // Update AsyncStorage
      // Ensure only one mode is selected
      if (!isDark && isLight) {
        setIsLight(false);
        await AsyncStorage.setItem("isLight", JSON.stringify(false)); // Update AsyncStorage
      }
    } catch (error) {
      console.error("Error setting isDark state in AsyncStorage:", error);
    }
  };

  // Function to toggle light mode
  const toggleLightMode = async () => {
    try {
      setIsLight((prevState) => !prevState); // Toggle isLight state
      await AsyncStorage.setItem("isLight", JSON.stringify(!isLight)); // Update AsyncStorage
      // Ensure only one mode is selected
      if (!isLight && isDark) {
        setIsDark(false);
        await AsyncStorage.setItem("isDark", JSON.stringify(false)); // Update AsyncStorage
      }
    } catch (error) {
      console.error("Error setting isLight state in AsyncStorage:", error);
    }
  };

  const handleSignOut = () => {
    // Implement your sign-out logic here
    console.log("Sign out button pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Choose a mode:</Text>

      {/* Images and checkboxes section */}
      <View style={styles.imageContainer}>
        {/* Dark mode */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={toggleDarkMode}
            style={[styles.imageWrapper, isDark && styles.imageWrapperSelected]}
          >
            <Image source={imageSource} style={styles.image} />
            {isDark && (
              <Ionicons
                name="checkmark-circle"
                size={30}
                color="#007AFF"
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.imageLabel}>Dark Mode</Text>
        </View>

        {/* Light mode */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={toggleLightMode}
            style={[
              styles.imageWrapper,
              isLight && styles.imageWrapperSelected,
            ]}
          >
            <Image source={imageSource} style={styles.image} />
            {isLight && (
              <Ionicons
                name="checkmark-circle"
                size={30}
                color="#007AFF"
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.imageLabel}>Light Mode</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Sign out button */}
      <Button
        title="Sign Out"
        onPress={handleSignOut}
        style={styles.signOutButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center images horizontally
    alignItems: "center", // Align items vertically
    width: "100%",
    marginTop: "30%",
    marginBottom: 20,
  },
  checkboxContainer: {
    alignItems: "center", // Center items horizontally
    marginHorizontal: 20, // Adjust horizontal margin to space out checkboxes
  },
  imageWrapper: {
    position: "relative",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  imageWrapperSelected: {
    borderColor: "#007AFF",
  },
  image: {
    width: 120, // Adjusted width to bring images closer
    height: 120, // Adjusted height to bring images closer
  },
  imageLabel: {
    textAlign: "center",
    marginTop: 5,
  },
  checkIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  divider: {
    height: 1,
    width: "80%",
    backgroundColor: "#CED0CE",
    marginVertical: 20,
  },
  signOutButton: {
    marginTop: 20,
  },
});

export default SettingsScreen;
