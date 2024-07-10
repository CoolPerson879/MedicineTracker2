import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Home,
  FileText,
  Plus,
  AreaChart,
  SettingsIcon,
} from "lucide-react-native";

import HomeScreen from "../screens/HomeScreen";
import DataScreen from "../screens/DataScreen";
import FormScreen from "../screens/FormScreen";
import GraphScreen from "../screens/GraphScreen";
import SettingsScreen from "../screens/SettingsScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBarButton = ({ children, onPress, backgroundColor }) => (
  <TouchableOpacity
    style={{
      top: -15,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const AppTabs = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
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
  return (
    <>
      {isDarkMode == false && (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              position: "absolute",
              bottom: 25,
              left: 20,
              right: 20,
              backgroundColor: "#ffffff",
              borderRadius: 25,
              height: 85,
              paddingBottom: 0,
              ...styles.shadow,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Home
                    style={{
                      width: 20,
                      height: 20,
                      color: focused ? "#B786DD" : "#000000",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#B786DD" : "#000000",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    Home
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Data"
            component={DataScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <FileText
                    style={{
                      width: 20,
                      height: 20,
                      color: focused ? "#B786DD" : "#000000",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#B786DD" : "#000000",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                    numberOfLines={1}
                  >
                    View Data
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Form"
            component={FormScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Plus
                  style={{
                    width: 25,
                    height: 25,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
                    color: focused ? "#EEAAEA" : "#000000",
                  }}
                />
              ),
              tabBarButton: (props) => (
                <CustomTabBarButton {...props} backgroundColor="#B786DD">
                  <Plus size={40} color="white" />
                </CustomTabBarButton>
              ),
            }}
          />
          <Tab.Screen
            name="Analytics"
            component={StatisticsScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <AreaChart
                    style={{
                      width: 20,
                      height: 20,
                      color: focused ? "#B786DD" : "#000000",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#B786DD" : "#000000",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    Analytics
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <SettingsIcon
                    style={{
                      width: 20,
                      height: 20,
                      color: focused ? "#B786DD" : "#000000",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#B786DD" : "#000000",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    Settings
                  </Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      )}
      {isDarkMode && (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              position: "absolute",
              bottom: 25,
              left: 20,
              right: 20,
              backgroundColor: "#202020",
              borderRadius: 25,
              height: 85,
              borderTopWidth: 0,
              paddingBottom: 0,
              ...styles.shadow,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Home
                    style={{
                      width: 20,
                      height: 20,
                      color: focused ? "#EEAAEA" : "#FFF",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#EEAAEA" : "#FFF",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    Home
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Data"
            component={DataScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <FileText
                    style={{
                      width: 20,
                      height: 20,
                      color: focused ? "#EEAAEA" : "#FFF",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#EEAAEA" : "#FFF",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                    numberOfLines={1}
                  >
                    View Data
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Form"
            component={FormScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Plus
                  style={{
                    width: 25,
                    height: 25,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    trgansform: [{ translateX: -12.5 }, { translateY: -12.5 }],
                    color: focused ? "#EEAAEA" : "#FFF",
                  }}
                />
              ),
              tabBarButton: (props) => (
                <CustomTabBarButton {...props} backgroundColor="#EEAAEA">
                  <Plus size={40} color="white" />
                </CustomTabBarButton>
              ),
            }}
          />
          <Tab.Screen
            name="Analytics"
            component={StatisticsScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <AreaChart
                    style={{
                      width: 20,
                      height: 20,
                      color: focused ? "#EEAAEA" : "#FFF",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#EEAAEA" : "#FFF",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    Analytics
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <SettingsIcon
                    style={{
                      width: 20,
                      height: 20,
                      color: focused ? "#EEAAEA" : "#FFF",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#EEAAEA" : "#FFF",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    Settings
                  </Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </>
  );
};

const TabBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        setIsLoggedIn(!!userData);
      } catch (error) {
        console.error("Error checking login status", error);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null; // or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={AppTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default TabBar;
