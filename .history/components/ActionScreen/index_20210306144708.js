import {
  ScrollView,
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import { Card, Title, Button, TextInput } from "react-native-paper";
import RNSpeedometer from "react-native-speedometer";
import { TabView, SceneMap } from "react-native-tab-view";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Col, Row, Grid } from "react-native-paper-grid";
import Speedometer from "./Speedometer"
import MapTab from "./MapTab"



const ActionScreen = ({ navigation }) => {
  const [isCompleted, setCompleted] = React.useState(false);
  const [stopwatchStart, setStopwatchStart] = React.useState(false);
  const [stopwatchReset, setStopwatchReset] = React.useState(false);
  const [averageSpeed, setAverageSpeed] = React.useState(50);
  const [currenTime, setCurrentTime] = React.useState();
  const initialLayout = { width: Dimensions.get("window").width };
 

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Speedometer" },
    { key: "second", title: "Map" },
  ]);

  const renderScene = SceneMap({
    first: Speedometer,
    second: MapTab,
  });

  //const onChange = (value) => setAverageSpeed(parseInt(value));

  const completeCountDown = () => {
    setCompleted(true);
    toggleStopwatch();
    return [false, 0];
  };

  const toggleStopwatch = () => {
    setStopwatchStart(!stopwatchStart);
    setStopwatchReset(false);
  };

  const resetStopwatch = () => {
    setStopwatchStart(false);
    setStopwatchReset(true);
  };

  const getFormattedTime = (time) => {
    if (!stopwatchStart) {
      setCurrentTime(time);
      console.log("time-check", time);
    }
  };

  const stopRunning = () => {
    toggleStopwatch();
  };

  return (
    <React.Fragment>
      {!isCompleted && (
        <View style={styles.countDownContainer}>
          <CountdownCircleTimer
            isPlaying
            duration={3}
            onComplete={() => completeCountDown()}
            colors={[
              ["#004777", 0.4],
              ["#F7B801", 0.4],
              ["#A30000", 0.2],
            ]}
          >
            {({ remainingTime, animatedColor }) => (
              <Animated.Text style={{ color: animatedColor }}>
                {remainingTime}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
        </View>
      )}
      {isCompleted && (
        <ScrollView>
          <SafeAreaView style={styles.contentContainer}>
            <Button
              onPress={() => stopRunning()}
              style={styles.stopButton}
              mode="container"
            >
              <Text style={styles.stopButtonText}> Stop run!</Text>
            </Button>

            <Stopwatch
              laps
              msecs
              start={stopwatchStart}
              reset={stopwatchReset}
              options={options}
              getTime={(time) => getFormattedTime(time)}
            />
            
            {/* <TextInput placeholder="Speedometer Value" style={styles.textInput} onChangeText={(value) => onChange(value)} /> */}
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
            />
          </SafeAreaView>
        </ScrollView>
      )}
    </React.Fragment>
  );
};

const options = {
  container: {
    backgroundColor: "#000",
    padding: 2,
    borderRadius: 5,
    //  width: 220,
  },
  text: {
    fontSize: 30,
    backgroundColor: "#FFF",
    marginLeft: 7,
  },
};

const styles = StyleSheet.create({
  scene: {
    backgroundColor: "#ff4081",
    flex: 1,
  },
  countDownContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  contentContainer: {
    padding: 8,
    marginHorizontal: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#ecf0f1",
    padding: 2,
  },

  textInput: {
    borderBottomWidth: 0.3,
    borderBottomColor: "black",
    height: 25,
    fontSize: 16,
    marginVertical: 50,
    marginHorizontal: 20,
  },
  remainingTime: {
    fontSize: 48,
  },

  stopButton: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "#56CCf2",
    borderWidth: 5,
    borderColor: "#56CCf2",
    borderRadius: 20,
    padding: 10,
  },

  stopButtonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 20,
  },
});

export default ActionScreen;
