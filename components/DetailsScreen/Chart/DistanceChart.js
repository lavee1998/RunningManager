import {
    Dimensions,
  } from "react-native";
  import React  from "react";
  
  import {
    ProgressChart,
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

  
  
  const Chart = ({  runCoordinates, time, setTime, distance, setDistance , timeStamp}) => {
    // const data = [];
  
    // console.log(runCoordinates)
    // runCoordinates.forEach((coor) => {
    //   data.push(coor["speed"]);
    // });

    let data = {
        labels: [], // optional
        data: []
      };

      if( setTime !== 0){
        data.labels.push("Set time")
        let value = timeStamp /setTime 
        console.log(timeStamp, setTime, value )
        data.data.push(value)
      }

      if( setDistance !== 0){
        data.labels.push("Set distance")
        let value = distance /setDistance 
        value = value > 1 ? 1 : value
        data.data.push(value)
        console.log(distance, setDistance, "távolság")
      }
    

console.log("itt vagyok", data)

let data2 = {
    labels: ["haliho"], // optional
    data: [1]
  };
  
    return (<ProgressChart
        data={data}
        width={Dimensions.get("window").width} // from react-native
        height={300}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />)
    //   )
    // return (
    //   <LineChart
    //     data={{
    //       datasets: [
    //         {
    //           data: data,
    //           strokeWidth: 4, // optional
    //         },
    //       ],
    //       legend: ["Your speed as a function of time"], // optional
    //     }}
    //     width={Dimensions.get("window").width} // from react-native
    //     height={300}
    //     // yAxisLabel=""
    //     yAxisSuffix="km/h"
    //     yAxisInterval={1} // optional, defaults to 1
    //     chartConfig={chartConfig}
    //     bezier
    //     opacity={1}
    //     withDots={false}
    //     style={{
    //       marginVertical: 8,
    //       marginHorizontal: 0,
    //       paddingHorizontal: 0,
    //       margin: 0,
    //       opacity: 1,
    //     }}
    //     withVerticalLabels={false}
    //     withInnerLines={false}
    //   />
    // );
  };
  
  export default Chart;
  