import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";

const StatisticsScreen = () => {
  const [data, setData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("formData");
      const formData = jsonValue != null ? JSON.parse(jsonValue) : [];
      setData(formData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    fetchData();

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

  const getChartData = (category) => {
    const categoryData = data.filter((item) => item.category === category);
    if (categoryData.length === 0) return null;

    const sortedData = categoryData.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const labels = sortedData.map((item) => item.name);
    const dataset = sortedData.map((item) =>
      item.number ? Number(item.number) : 0
    );

    return {
      labels,
      datasets: [
        {
          data: dataset,
          color: (opacity = 1) =>
            isDarkMode
              ? `rgba(238, 170, 234, ${opacity})`
              : `rgba(186, 136, 184, ${opacity})`, // Line color
          strokeWidth: 2, // Optional
        },
      ],
    };
  };

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.containerDark]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={isDarkMode ? styles.titleDark : styles.title}>
          Statistics
        </Text>
        <Text style={isDarkMode ? styles.descriptionDark : styles.description}>
          This screen shows statistical insights on your activities, with hours
          on the vertical axis and dates on the horizontal axis
        </Text>
        {[
          "Clinical",
          "Extracurricular",
          "Shadowing",
          "Volunteer",
          "Research",
        ].map((category) => {
          const chartData = getChartData(category);
          return chartData ? (
            <View key={category} style={styles.chartContainer}>
              <Text
                style={isDarkMode ? styles.chartTitleDark : styles.chartTitle}
              >
                {category}
              </Text>
              <View style={styles.chartWrapper}>
                <LineChart
                  data={chartData}
                  width={Dimensions.get("window").width - 30}
                  height={220}
                  chartConfig={{
                    backgroundColor: isDarkMode ? "#3e3e3e" : "#EEE",
                    backgroundGradientFrom: isDarkMode ? "#3e3e3e" : "#EEE",
                    backgroundGradientTo: isDarkMode ? "#3e3e3e" : "#EEE",
                    decimalPlaces: 0,
                    color: (opacity = 1) =>
                      isDarkMode
                        ? `rgba(238, 170, 234, ${opacity})`
                        : `rgba(186, 136, 184, ${opacity})`, // Line color
                    labelColor: (opacity = 1) =>
                      `rgba(238, 170, 234, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: isDarkMode ? "#EEAAEA" : "#BA88B8",
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  withInnerLines={true}
                  withOuterLines={true}
                  withVerticalLabels={false} // Remove vertical labels
                  fromZero={true} // Start y-axis from zero
                />
              </View>
            </View>
          ) : (
            <Text key={`no-data-${category}`} style={styles.noDataText}>
              No data available for {category}
            </Text>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerDark: {
    backgroundColor: "#181818",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#000",
  },
  titleDark: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#FFF",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    color: "#000",
  },
  descriptionDark: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    color: "#FFF",
  },
  chartContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  chartWrapper: {
    position: "relative",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  chartTitleDark: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFF",
  },
  noDataText: {
    textAlign: "center",
    color: "#888",
    marginBottom: 20,
  },
  timeLabel: {
    position: "absolute",
    bottom: 15,
    left: Dimensions.get("window").width / 2 - 30,
    fontSize: 14,
    color: "#000",
  },
  timeLabelDark: {
    position: "absolute",
    bottom: 5,
    left: Dimensions.get("window").width / 2 - 20,
    fontSize: 14,
    color: "#FFF",
  },
});

export default StatisticsScreen;
