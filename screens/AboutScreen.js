import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Cookie, Lock } from "lucide-react-native";

const AboutScreen = ({ navigation }) => {
  const handleNavigateToAbout = () => {
    navigation.navigate("CookiePolicy");
  };
  const handleNavigateToPP = () => {
    navigation.navigate("PrivacyPolicy");
  };
  const handleNavigateToTOS = () => {
    navigation.navigate("TermsAndConditions");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#007AFF" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.content}>
        This app provides various settings and statistics. You can toggle
        between dark and light mode and view detailed statistics of your
        activities.
      </Text>

      <Text style={styles.copyright}>&copy; 2024 RajScape</Text>

      <TouchableOpacity
        style={styles.aboutButton}
        onPress={handleNavigateToAbout}
      >
        <View style={styles.iconBackground}>
          <Cookie color="white" size={24} />
        </View>
        <Text style={styles.aboutButtonText}>Cookie Policy</Text>
        <View style={styles.chevronContainer}>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.aboutButton} onPress={handleNavigateToPP}>
        <View style={styles.iconBackground}>
          <Lock color="white" size={24} />
        </View>
        <Text style={styles.aboutButtonText}>Privacy Policy</Text>
        <View style={styles.chevronContainer}>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.aboutButton}
        onPress={handleNavigateToTOS}
      >
        <View style={styles.iconBackground}>
          <Lock color="white" size={24} />
        </View>
        <Text style={styles.aboutButtonText}>Terms and Conditions</Text>
        <View style={styles.chevronContainer}>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chevronContainer: {
    position: "absolute", // Positioning it to the end
    right: 20, // Adjust as needed for spacing
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  copyright: {
    margin: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF",
    marginLeft: 5,
  },
  iconBackground: {
    backgroundColor: "#000", // Slightly darker pastel blue
    borderRadius: 11,
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  content: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
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
});

export default AboutScreen;
