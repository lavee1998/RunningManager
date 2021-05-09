import { Dimensions } from "react-native";
import React from "react";
import { ProgressChart } from "react-native-chart-kit";

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
    padding: 20,
  },
  propsForHorizontalLabels: {
    marginHorizontal: 9,
    textAlign: "center",
    padding: 20,
    color: "#012345",
  },
  decimalPlaces: 1, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

  style: {
    marginVertical: 8,
    borderRadius: 16,
  },
  // paddingRight: 20,
};

const Chart = ({ goalInterval, timeStamp, distance, goalDistance }) => {
  let data = {
    labels: [], // optional
    data: [],
    colors: [],
  };

  if (goalInterval) {
    data.labels.push("Time");
    let value = timeStamp / goalInterval;
    value = value > 1 ? 1 : value;
    data.data.push(value);
  }

  if (goalDistance) {
    data.labels.push("Distance");
    let value = distance / goalDistance;
    value = value > 1 ? 1 : value;
    data.data.push(value);
  }

  return (
    <ProgressChart
      //style={{paddingRight: 100}}
      data={data}
      width={Dimensions.get("window").width} // from react-native
      height={300}
      strokeWidth={16}
      radius={32}
      chartConfig={chartConfig}
      hideLegend={false}
    />
  );
};

export default Chart;
