import {
  ScrollView,
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
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
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import * as TaskManager from "expo-task-manager";
import haversine from "haversine"

// import BackgroundGeolocation from "react-native-background-geolocation";

const ActionScreen = ({ navigation }) => {
  const [isCompleted, setCompleted] = React.useState(false);
  const [stopwatchStart, setStopwatchStart] = React.useState(false);
  const [stopwatchReset, setStopwatchReset] = React.useState(false);
  const [averageSpeed, setAverageSpeed] = React.useState(40);
  const [currentSpeed, setCurrentSpeed] = React.useState();
  const [currenTime, setCurrentTime] = React.useState();
  const [distance, setDistance] = React.useState(20);
  const initialLayout = { width: Dimensions.get("window").width };

  const updateTask = "UPDATE_LOCATION_TASK";
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Speedometer" },
    { key: "second", title: "Map" },
  ]);
  const [runCoordinates, setCoordinates] = React.useState([]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      Location.watchPositionAsync(
        { accuracy: 6, timeInterval: 3, distanceInterval: 1 },
        updatePosition
      );
    })();
  }, []);

  const updatePosition = (currLocation) => {

    const start = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    
    const end = {
      latitude: 27.950575,
      longitude: -82.457178
    }
    
    console.log(location);
    setLocation(location);

  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const MapTab = () => (
    <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
  );

  const Speedometer = () => <RNSpeedometer value={averageSpeed} />;

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
  //gps

  return (
    <React.Fragment>
      {!isCompleted && (
        <View style={styles.countDownContainer}>
          <CountdownCircleTimer
            isPlaying
            duration={2}
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
            <Button>
              <TouchableOpacity onPress={onPress}>
                <Text>Enable background location</Text>
              </TouchableOpacity>
            </Button>

            <Text>{text}</Text>

            <Stopwatch
              laps
              msecs
              start={stopwatchStart}
              reset={stopwatchReset}
              options={options}
              getTime={(time) => getFormattedTime(time)}
            />

            {/* <Grid>
              <Row style={styles.paddingMarginZero}>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.primaryDataText}>Average Speed</Text>
                </Col>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.secondaryDataText}>
                    {averageSpeed} km/h
                  </Text>
                </Col>
              </Row>
              <Row style={styles.paddingMarginZero}>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.secondaryDataText}>Distance</Text>
                </Col>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.primaryDataText}>{distance} km</Text>
                </Col>
              </Row>
            </Grid> */}

            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
            />

            <Grid style={styles.paddingMarginZero}>
              <Row style={styles.paddingMarginZero}>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.primaryDataText}>Average Speed</Text>
                </Col>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.secondaryDataText}>
                    {averageSpeed} km/h
                  </Text>
                </Col>
              </Row>
              <Row style={styles.paddingMarginZero}>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.secondaryDataText}>Distance</Text>
                </Col>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.primaryDataText}>{distance} km</Text>
                </Col>
              </Row>
            </Grid>
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
  paddingMarginZero: {
    margin: 0,
    padding: 0,
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

  primaryDataText: {
    padding: 8,
    color: "white",
    backgroundColor: "#333333",
    textAlign: "center",
  },
  secondaryDataText: {
    padding: 8,
    color: "black",
    backgroundColor: "#E0E0E0",
    textAlign: "center",
    fontWeight: "800",
  },

  stopButtonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 20,
    fontWeight: "800",
  },
});

export default ActionScreen;
