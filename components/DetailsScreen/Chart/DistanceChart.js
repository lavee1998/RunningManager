import { Dimensions } from "react-native";
import React  from "react";
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

  const Chart = ({ setTime, timeStamp, distance, setDistance}) => {

    let data = {
      labels: [], // optional
      data: [],
      colors: []
    };

    if(setTime !== 0) {
      data.labels.push("Set time");
      let value = timeStamp / setTime;
      value = value > 1 ? 1 : value;
      data.data.push(value);
    }

    if(setDistance !== 0) {
      data.labels.push("Set distance");
      let value = distance / setDistance;
      value = value > 1 ? 1 : value;
      data.data.push(value);
    }
  
    return (
      <ProgressChart
        data={data}
        width={Dimensions.get("window").width} // from react-native
        height={300}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    )
  };
  
  export default Chart;
  