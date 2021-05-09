import {
  ScrollView,
  Text,
  SafeAreaView,
  StyleSheet,
  Vibration,
} from "react-native";
import React from "react";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import RNSpeedometer from "react-native-speedometer";
import { Col, Row, Grid } from "react-native-paper-grid";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import MapComponent from "../MapComponent";
import { connect } from "react-redux";
import getCopiedLocation from "./getCopiedLocation";
import getDistanceOfLastElements from "./getDistanceOfLastElements";
import getDistance from "./getDistance";
import getHHMMSS from "./getHHMMSS";
import toFixing from "./toFixing";
import calculateAvg from "./calculateAvg";
import countStops from "./countStops";

// This component is responsible for handling the user's running.
// navigation      -- navigation
// goalDistance    -- the previously saved goal distance
// goalInterval    -- the previosly saved goal interval
// startDate       -- fix needed
// setCurrentRunning -- method for saving the current running
// setIsRunning    -- when there is active Running, the navigation to another screen should be blocked
// setGoalDistance -- method for setting the goal distance
// setGoalInterval -- method for setting the goal interval
const ActionScreen = ({
  navigation,
  goalDistance,
  goalInterval,
  startDate,
  setCurrentRunning,
  setIsRunning,
  setGoalDistance,
  setGoalInterval
}) => {
  //States
  const [stopwatchStart, setStopwatchStart] = React.useState(false);
  const [averageSpeed, setAverageSpeed] = React.useState(0);
  const [currentSpeed, setCurrentSpeed] = React.useState(0);
  const [distance, setDistance] = React.useState(0);
  const [runCoordinates, setCoordinates] = React.useState([]);
  const [message, setMessage] = React.useState(null);
  const [visibleAlert, setVisibleAlert] = React.useState(false);
 // const [watchPositionStatus, setWatchPositionStatus] = React.useState();
  const [tooSlow, setTooSlow] = React.useState(false);

  let watchPositionStatus = React.useRef()
  // Vibrating message to the user
  const VIBRATINGMS = 500;

  // Timer
  let timer = React.useRef(null);
  let almostTimer = React.useRef(null);

  // speed related variables
  const slow = 5;
  let lastTm = 0;
  let arr = [];
  let warned = 0;
  let letDistance = 0;
  let first = 3;

  const LOCATION_SETTINGS = {
    accuracy:Location.Accuracy.High,
    distanceInterval: 3,
  };

  // ----------------------- METHODS ----------------------------

  useEffect(() => {
    toggleStopwatch();
    setIsRunning(true);

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      watchPositionStatus.current = await Location.watchPositionAsync(
        LOCATION_SETTINGS,
        updatePosition
      );

      //setWatchPositionStatus(watchPositionStatus);

      if (goalInterval) {
        almostTimer.current = setTimeout(almostPassedTime, 0.8 * goalInterval);
        timer.current = setTimeout(passedTime, goalInterval);
      }
    })();
  }, []);

  const updatePosition = (currLocation) => {
    if (arr.length) {
      const lastTimeStamp = arr[arr.length - 1].timestamp;
      const lastLocation = arr[arr.length - 1];
      const currDistance = getDistance(lastLocation, currLocation.coords);
      currLocation.coords.speed = calculateAvg(
        currDistance,
        currLocation.timestamp - (lastTm ? lastTm : lastTimeStamp)
      );
      setAverageSpeed(
        calculateAvg(letDistance, currLocation.timestamp - arr[0].timestamp)
      );

      if (currDistance > 0.004 && currLocation.coords.speed < 40) {
        letDistance = toFixing(parseFloat(letDistance) + currDistance, 3);
        setDistance(letDistance);
        lastTm = 0;
        currLocation.coords.timestamp = currLocation.timestamp;
        arr = [...arr, currLocation.coords];
      } else {
        if (!lastTm) lastTm = arr[arr.length - 1].timestamp;
        arr = [...arr, getCopiedLocation(arr, currLocation).coords];
      }
      if (currLocation.coords.speed < 40) {
        if (arr.length > 7) {

          //moving avg
          arr[arr.length - 1].speed = calculateAvg(
            getDistanceOfLastElements(arr, 6),
            arr[arr.length - 1].timestamp - arr[arr.length - 7].timestamp
          ); //interpolated curr speed
          setCurrentSpeed(arr[arr.length - 1].speed);
          setTooSlow(arr[arr.length - 1].speed < slow);
        } else arr[arr.length - 1].speed = 0;

        setCoordinates(arr);
      }

      // alert messages for the user based on the distance
      if (goalDistance !== null && goalDistance * 0.95 <= letDistance && warned === 0) {
        warned = warned + 1;
        almostReachedDistance();
      }
      
      if (goalDistance !== null && goalDistance <= letDistance && warned === 1) {
        warned = warned + 1;
        reachedDistance();
      }
      arr[arr.length - 1].distance=letDistance;
    } else {
      if (first === 0) {
        currLocation.coords.speed = 0;
        currLocation.coords.timestamp = currLocation.timestamp;
        currLocation.coords.distance=letDistance;
        arr = [...arr, currLocation.coords];
        setCoordinates(arr);
      } else {
        first = first - 1;
      }
    }
  };

  const toggleStopwatch = () => {
    setStopwatchStart(!stopwatchStart);
  };

  const stopRunning = () => {

    toggleStopwatch();
    watchPositionStatus.current.remove();

    if (goalInterval) {
      clearTimeout(timer.current);
      clearTimeout(almostTimer.current);
    }
    
    let currentRun = {
      runCoordinates: runCoordinates,
      avgSpeed: averageSpeed,
      topSpeed: runCoordinates.length ? Math.max.apply(
        Math,
        runCoordinates.map(function (coord) {
          return coord.speed;
        })
      ) : 0,
      time: runCoordinates.length ? getHHMMSS(Date.now() - runCoordinates[0].timestamp) : '-',
      timeStamp: runCoordinates.length ? Date.now() - runCoordinates[0].timestamp : 0,
      distance: distance,
      goalInterval: goalInterval,
      goalDistance: goalDistance,
      stopCounter : runCoordinates.length ? countStops(runCoordinates) : 0,
      startDate: startDate,
      maxAltitude: runCoordinates.length ? Math.max.apply(
        Math,
        runCoordinates.map(function (coord) {
          return coord.altitude;
        })
      ) : 0,
    };

    setCurrentRunning(currentRun);
    setIsRunning(false);
    setGoalInterval(null);
    setGoalDistance(null);

    navigation.navigate("Details");
  };

  // Alert messages for the user
  const passedTime = () => {
    setMessage("Time is over! You reached the previously set time.");
    Vibration.vibrate(VIBRATINGMS);
    setVisibleAlert(true);
  };

  const almostPassedTime = () => {
    setMessage("The time is almost over!");
    Vibration.vibrate(VIBRATINGMS);
    setVisibleAlert(true);
  };

  const almostReachedDistance = () => {
    setMessage("You almost reached the previously set distance!");
    Vibration.vibrate(VIBRATINGMS);
    setVisibleAlert(true);
  };

  const reachedDistance = () => {
    setMessage("You reached the previously set distance!");
    Vibration.vibrate(VIBRATINGMS);
    setVisibleAlert(true);
  };

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
              <Stopwatch laps secs start={stopwatchStart} options={options} />
            </Row>

            {tooSlow && (
              <Row style={styles.container}>
                <Text style={styles.speedWarn}>You are too slow!</Text>
              </Row>
            )}

            <Row style={styles.paddingMarginZero}>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.primaryDataText}>Average Speed</Text>
              </Col>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.secondaryDataText}>
                  {averageSpeed.toFixed(1)} km/h
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

            <Row style={styles.speedometerRow}>
              <RNSpeedometer
                maxValue={currentSpeed > 40 ? 100 : 40}
                value={currentSpeed}
                size={300}
              />
            </Row>

            <MapComponent runningCoordinates={runCoordinates} detailsView={false} />
          </Grid>
          <Portal>
            <Dialog
              visible={visibleAlert}
              onDismiss={() => setVisibleAlert(false)}
            >
              <Dialog.Title>
                <Icon name="exclamation-triangle" size={30} color="#900" />{" "}
                Warning!
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
    </React.Fragment>
  );
};

const options = {
  container: {
    backgroundColor: "#000",
    padding: 2,
    borderRadius: 5,
  },
  text: {
    fontSize: 30,
    backgroundColor: "#FFF",
    marginLeft: 7,
  },
};

const styles = StyleSheet.create({
  speedometerRow: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 50,
  },

  paddingMarginZero: {
    margin: 0,
    padding: 0,
  },

  speedWarn: {
    color: "red",
    fontWeight: "900",
    fontSize: 30,
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
  goalInterval: state.reducer.goalInterval,
  goalDistance: state.reducer.goalDistance,
  startDate: state.reducer.startDate,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setGoalInterval: (interval) =>
      dispatch({
        type: "SET_GOALINTERVAL",
        payload: interval,
      }),

    setGoalDistance: (distance) =>
      dispatch({
        type: "SET_GOALDISTANCE",
        payload: distance,
      }),

    setIsRunning: (isRunning) =>
      dispatch({
        type: "SET_IS_RUNNING",
        payload: isRunning,
      }),

    setCurrentRunning: (currentRun) =>
      dispatch({
        type: "SAVE_CURRENTRUNNING",
        payload: {
          ...currentRun,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionScreen);
