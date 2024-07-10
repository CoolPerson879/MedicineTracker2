import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  "Clinical",
  "Extracurricular",
  "Shadowing",
  "Volunteer",
  "Research",
];

const GraphScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("formData");
        const formData = jsonValue != null ? JSON.parse(jsonValue) : [];
        setData(formData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const processDataForChart = (category) => {
    const categoryData = data.filter((item) => item.category === category);

    if (categoryData.length === 0) return null;

    const sortedData = categoryData.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const labels = sortedData.map((item) =>
      new Date(item.date).toLocaleDateString()
    );
    const values = sortedData.map((item) => item.number);

    return {
      labels,
      datasets: [
        {
          data: values,
        },
      ],
    };
  };

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("formData");
      const formData = jsonValue != null ? JSON.parse(jsonValue) : [];
      setData(formData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {categories.map((category) => {
          const chartData = processDataForChart(category);
          if (!chartData) return null;

          return (
            <View key={category} style={styles.chartContainer}>
              <LineChart
                data={chartData}
                width={Dimensions.get("window").width - 30}
                height={220}
                withHorizontalLabels={false}
                withVerticalLabels={false}
                chartConfig={{
                  backgroundColor: "#fff",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 10,
    alignItems: "center",
  },
  chartContainer: {
    marginBottom: 20,
  },
});

export default GraphScreen;
