import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Updates from "expo-updates"; // Import the Updates module
import { FocusAwareStatusBar } from "../components/TabBar";

const darkHome = require("../assets/darkhome.jpeg");
const lightHome = require("../assets/lighthome.jpeg");

const SettingsScreen = ({ navigation }) => {
  const [isDark, setIsDark] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    loadCheckedState();
  }, []);

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

  const toggleDarkMode = async () => {
    try {
      const newDarkMode = !isDark;
      setIsDark(newDarkMode);
      await AsyncStorage.setItem("isDark", JSON.stringify(newDarkMode));

      if (newDarkMode && isLight) {
        setIsLight(false);
        await AsyncStorage.setItem("isLight", JSON.stringify(false));
      }

      // Reload the app
      Alert.alert("Mode Changed", "The app will reload to apply the changes.", [
        {
          text: "OK",
          onPress: () => Updates.reloadAsync(),
        },
      ]);
    } catch (error) {
      console.error("Error setting isDark state in AsyncStorage:", error);
    }
  };

  const toggleLightMode = async () => {
    try {
      const newLightMode = !isLight;
      setIsLight(newLightMode);
      await AsyncStorage.setItem("isLight", JSON.stringify(newLightMode));

      if (newLightMode && isDark) {
        setIsDark(false);
        await AsyncStorage.setItem("isDark", JSON.stringify(false));
      }

      // Reload the app
      Alert.alert("Mode Changed", "The app will reload to apply the changes.", [
        {
          text: "OK",
          onPress: () => Updates.reloadAsync(),
        },
      ]);
    } catch (error) {
      console.error("Error setting isLight state in AsyncStorage:", error);
    }
  };

  const handleNavigateToAbout = () => {
    navigation.navigate("About");
  };

  return (
    <SafeAreaView style={isDark ? styles.containerDark : styles.container}>
      <FocusAwareStatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
      />
      <Text style={isDark ? styles.titleDark : styles.title}>Settings</Text>
      <Text style={isDark ? styles.subtitleDark : styles.subtitle}>
        Choose a mode:
      </Text>
      <View style={styles.imageContainer}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={toggleDarkMode}
            style={[styles.imageWrapper, isDark && styles.imageWrapperSelected]}
          >
            <Image source={darkHome} style={styles.image} />
            {isDark && (
              <Ionicons
                name="checkmark-circle"
                size={30}
                color="#007AFF"
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
          <Text style={isDark ? styles.imageLabelDark : styles.imageLabel}>
            Dark Mode
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={toggleLightMode}
            style={[
              styles.imageWrapper,
              isLight && styles.imageWrapperSelected,
            ]}
          >
            <Image source={lightHome} style={styles.image} />
            {isLight && (
              <Ionicons
                name="checkmark-circle"
                size={30}
                color="#007AFF"
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
          <Text style={isDark ? styles.imageLabelDark : styles.imageLabel}>
            Light Mode
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.aboutButton}
        onPress={handleNavigateToAbout}
      >
        <View style={styles.iconBackground}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#FFFFFF"
          />
        </View>
        <Text
          style={isDark ? styles.aboutButtonTextDark : styles.aboutButtonText}
        >
          About
        </Text>
        <View style={styles.chevronContainer}>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={isDark ? "#FFF" : "#000"}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  containerDark: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#181818",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  titleDark: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitleDark: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    color: "#FFFFFF",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  checkboxContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  chevronContainer: {
    position: "absolute",
    right: 20,
  },
  imageWrapper: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  iconBackground: {
    backgroundColor: "#7EC6E8",
    borderRadius: 11,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  imageWrapperSelected: {
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  image: {
    width: 160,
    height: 350,
  },
  imageLabel: {
    textAlign: "center",
    marginTop: 5,
  },
  imageLabelDark: {
    textAlign: "center",
    marginTop: 5,
    color: "#FFFFFF",
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
  aboutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#CED0CE",
    textAlign: "left",
  },

  aboutButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    textAlign: "left",
  },
  aboutButtonTextDark: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "left",
  },
});

export default SettingsScreen;
