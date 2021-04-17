import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { Button } from "react-native-paper";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const graphStyle = {
  marginHorizontal: 8,
};

const chartConfig = {
  backgroundColor: "#e22fa0",
  backgroundGradientFrom: "#ff8c00",
  backgroundGradientTo: "#ffa726",
  propsForVerticalLabels: {
    marginHorizontal: 9,
    textAlign: "center",
    color: "#012345",
  },
  propsForHorizontalLabels: {
    marginHorizontal: 9,
    textAlign: "center",
    color: "#012345",
  },
  decimalPlaces: 1, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, 0.7)`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const Chart = ({ runCoordinates }) => {
  const data = [];

  runCoordinates.forEach((coor) => {
    data.push(coor["speed"]);
  });

  return (
    <LineChart
      data={{
        datasets: [
          {
            data: data,
            strokeWidth: 4, // optional
          },
        ],
        legend: ["Your speed as a function of time"], // optional
      }}
      width={Dimensions.get("window").width} // from react-native
      height={300}
      // yAxisLabel=""
      yAxisSuffix="km/h"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={chartConfig}
      bezier
      opacity={1}
      withDots={false}
      style={{
        marginVertical: 8,
        marginHorizontal: 0,
        paddingHorizontal: 0,
        margin: 0,
        opacity: 1,
      }}
      withVerticalLabels={false}
      withInnerLines={false}
    />
  );
};

export default Chart;
