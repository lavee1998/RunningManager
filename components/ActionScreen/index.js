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
  Vibration,
} from "react-native";
import React from "react";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import {
  Card,
  Title,
  Button,
  TextInput,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import RNSpeedometer from "react-native-speedometer";
import { TabView, SceneMap } from "react-native-tab-view";
// import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Col, Row, Grid } from "react-native-paper-grid";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import MapComponent from "../MapComponent";
import haversine from "haversine";
import { connect } from "react-redux";

// This component is responsible for the main running process
// navigation -- ??
const ActionScreen = ({
  navigation,
  goal,
  interval,
  startDate,
  setCurrentRunning,
}) => {
  const [stopwatchStart, setStopwatchStart] = React.useState(false);
  //const [stopwatchReset, setStopwatchReset] = React.useState(false);
  const [averageSpeed, setAverageSpeed] = React.useState(0);
  const [currentSpeed, setCurrentSpeed] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState();
  const [distance, setDistance] = React.useState(0);
  const initialLayout = { width: Dimensions.get("window").width };
  const [text, setText] = React.useState("Waiting...");
  const [index, setIndex] = React.useState(0);
  const [runCoordinates, setCoordinates] = React.useState([]);
  const [message, setMessage] = React.useState(null);
  const [visibleAlert, setVisibleAlert] = React.useState(false);
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [
    almostReachedDistanceInformation,
    setAlmostReachedDistanceInformation,
  ] = useState(true);
  const [reachedDistanceInformation, setReachedDistanceInformation] = useState(
    true
  );
  const [
    almostReachedTimeInformation,
    setAlmostReachedTimeInformation,
  ] = useState(true);
  const [reachedTimeInformation, setReachedTimeInformation] = useState(true);

  // Vibrating message to the user
  const VIBRATINGMS = 500;

  let timer;
  let almostTimer;
  const [routes] = React.useState([
    { key: "first", title: "Speedometer" },
    { key: "second", title: "Map" },
  ]);

  const MapTab = () => <MapComponent runCoordinates={runCoordinates} />;

  const Speedometer = () => (
    <RNSpeedometer maxValue={currentSpeed > 7 ? 40 : 7} value={currentSpeed} />
  );

  const renderScene = SceneMap({
    first: Speedometer,
    second: MapTab,
  });

  // ----------------------- METHODS ----------------------------
  useEffect(() => {
    toggleStopwatch();
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let watcher = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 12 },
        updatePosition
      );

      if (interval) {
        almostTimer = setTimeout(almostPassedTime, 0.8 * interval);
        timer = setTimeout(passedTime, interval);
      } //clearTimeout(timer)
    })();
  }, []);

  const passedTime = () => {
    if (reachedTimeInformation) {
      setMessage("Lejárt az idő! Sikerült elérni a megadott intervallumot.");
      setReachedTimeInformation(false);
      Vibration.vibrate(VIBRATINGMS);
      setVisibleAlert(true);
    }
  };

  const almostPassedTime = () => {
    if (almostReachedTimeInformation) {
      setMessage("Hamarosan lejár az idő!");
      setAlmostReachedTimeInformation(false);
      Vibration.vibrate(VIBRATINGMS);
      setVisibleAlert(true);
    }
  };

  const almostReachedDistance = () => {
    setMessage("Hamarosan célba érsz!");
    setAlmostReachedDistanceInformation(false);
    Vibration.vibrate(VIBRATINGMS);
    setVisibleAlert(true);
  };

  const reachedDistance = () => {
    setMessage("Elérted a kívánt útmennyiséget!");
    setReachedDistanceInformation(false);
    Vibration.vibrate(VIBRATINGMS);
    setVisibleAlert(true);
    setIsRunningOver(true);
  };

  const calculateAvgSpeed = () => {
    if (runCoordinates.length === 0) return;
    let sumSpeed = 0;
    runCoordinates.forEach((corr) => {
      if (corr.speed > 0) {
        sumSpeed = sumSpeed + corr.speed;
      }
    });
    setAverageSpeed(sumSpeed / runCoordinates.length);
  };

  let letDistance = 0;
  let arr = [];
  let letLastTimeStamp;
  let letCurrentSpeed;

  const updatePosition = (currLocation) => {
    if (currLocation.coords.speed >= 0) {
      if (runCoordinates.length !== 0) {
        const lastLocation = runCoordinates[runCoordinates.length - 1];

        let start = {
          latitude: lastLocation.latitude,
          longitude: lastLocation.longitude,
        };

        let end = {
          latitude: currLocation.coords.latitude,
          longitude: currLocation.coords.longitude,
        };

        let currDistance = haversine(start, end, { unit: "kilometer" });
        letDistance =
          Math.round(
            (parseFloat(letDistance) + Math.round(currDistance * 1000) / 1000) *
              1000
          ) / 1000;
        console.log(letDistance, "distance-test");
        setDistance(letDistance);

        // we should inform the user only once
        if (goal * 0.95 <= letDistance && almostReachedDistanceInformation) {
          almostReachedDistance();
        }

        if (goal <= letDistance && reachedDistanceInformation) {
          reachedDistance();
        }
      }

      //Should we use this line, or not?
      if (letLastTimeStamp && letDistance) {
        letCurrentSpeed =
          currDistance /
          ((letLastTimeStamp - currLocation.timestamp) * 1000) /
          3600;
      }

      letLastTimeStamp = currLocation.timestamp;

      //console.log(arr.length);
      arr = [...arr, currLocation.coords];

      setCoordinates(arr);
      setCurrentSpeed(currLocation.coords.speed);
      calculateAvgSpeed();
    }
  };

  //const onChange = (value) => setAverageSpeed(parseInt(value));

  // const completeCountDown = () => {
  //   setCompleted(true);
  //   return [false, 0];
  // };

  const toggleStopwatch = () => {
    setStopwatchStart(!stopwatchStart);
    setAlmostReachedDistanceInformation(false);
    setReachedTimeInformation(false);
    setAlmostReachedTimeInformation(false);
    setReachedTimeInformation(false);
  };

  const getFormattedTime = (time) => {
    if (!stopwatchStart) {
      setCurrentTime(time);
    }
  };

  const stopRunning = () => {
    toggleStopwatch();
    //addToRuns(runCoordinates)

    let currentRun = {
      corrds: runCoordinates,
      avgSpeed: averageSpeed,
      topSpeed: Math.max.apply(
        Math,
        runCoordinates.map(function (corrd) {
          return corrd.speed;
        })
      ),
      time: currentTime,
      distance: distance,
      setTime: interval, //settime
      setDistance: goal, //setDistance
      startDate: startDate,
      maxAltitude: Math.max.apply(
        Math,
        runCoordinates.map(function (corrd) {
          return corrd.altitude;
        })
      ),
    };
    setCurrentRunning(currentRun);
    navigation.navigate("Details");
  };
  //gps

  return (
    <React.Fragment>
      <ScrollView>
        <SafeAreaView style={styles.contentContainer}>
          <Grid style={styles.paddingMarginZero}>
            <Button
              onPress={() => stopRunning()}
              style={styles.stopButton}
              mode="container"
            >
              <Text style={styles.stopButtonText}>Stop Run!</Text>
            </Button>
            <Row style={styles.container}>
              <Stopwatch
                laps
                msecs
                start={stopwatchStart}
                options={options}
                getTime={(time) => getFormattedTime(time)}
              />
            </Row>
            <Row style={styles.paddingMarginZero}>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.primaryDataText}>Average Speed</Text>
              </Col>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.secondaryDataText}>{averageSpeed} m/s</Text>
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
            <Row style={styles.paddingMarginZero}>
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
              />
            </Row>
          </Grid>
          <Portal>
            <Dialog
              visible={visibleAlert}
              onDismiss={() => setVisibleAlert(false)}
            >
              <Dialog.Title>
                <Icon name="exclamation-triangle" size={30} color="#900" />{" "}
                Figyelem!
              </Dialog.Title>
              <Dialog.Content>
                <Paragraph>{message}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setVisibleAlert(false)}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </SafeAreaView>
      </ScrollView>
      {/* )} */}
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

const mapStateToProps = (state) => ({
  interval: state.reducer.interval,
  goal: state.reducer.goal,
  startDate: state.reducer.startDate,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentRunning: (currentRun) =>
      dispatch({
        type: "SAVE_CURRENTRUNNING",
        payload: {
          corrds: currentRun.coords,
          avgSpeed: currentRun.avgSpeed,
          topSpeed: currentRun.topSpeed,
          time: currentRun.time,
          distance: currentRun.distance,
          setTime: currentRun.setTime, //settime
          setDistance: currentRun.setDistance, //setDistance
          startDate: currentRun.startDate,
          maxAltitude: currentRun.maxAltitude,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionScreen);
