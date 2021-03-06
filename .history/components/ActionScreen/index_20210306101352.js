import {
  ScrollView,
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  Animated,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import { Card, Title, Button, TextInput } from "react-native-paper";
import RNSpeedometer from 'react-native-speedometer'
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const ActionScreen = ({navigation}) => {
  const [isCompleted, setCompleted] = React.useState(false);
  const [stopwatchStart, setStopwatchStart] = React.useState(false);
  const [stopwatchReset, setStopwatchReset] = React.useState(false);
  const [averageSpeed, setAverageSpeed] = React.useState(0)
  const [currenTime, setCurrentTime] = React.useState();


  onChange = (value) => this.setState({ value: parseInt(value) });

  const completeCountDown = () => {
    console.log("végeztem");
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
    toggleStopwatch()

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text> "Hello from actionScreen" </Text>

      {!isCompleted && (
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
      )}

      {isCompleted && (
        <View>
          <Button
            onPress={() => stopRunning()}
            style={styles.startButton}
            mode="container"
          >
            <Text style={styles.startButtonText}> Stop run!</Text>
          </Button>

          {/* <TouchableHighlight onPress={() => toggleStopwatch()}>
            <Text style={{ fontSize: 30 }}>
              {stopwatchStart ? "Stop" : "Start"}
            </Text>
          </TouchableHighlight> */}
          {/* <TouchableHighlight onPress={() => resetStopwatch()}>
            <Text style={{ fontSize: 30 }}>Reset</Text>
          </TouchableHighlight> */}
          <Stopwatch
            laps
            msecs
            start={stopwatchStart}
            reset={stopwatchReset}
            options={options}
            getTime={(time) => getFormattedTime(time)}
          />
        </View>
      )}
    </SafeAreaView>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  remainingTime: {
    fontSize: 48,
  },
});

export default ActionScreen;
