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
import isStopped from "./isStopped";
import getHHMMSS from "./getHHMMSS";
import toFixing from "./toFixing";
import calculateAvg from "./calculateAvg";
import countStops from "./countStops";

// This component is responsible for handling the user's running.
// navigation   -- navigation
// goal         -- the previously saved goal distance
// interval     -- the previosly saved goal interval
// startDate    -- fix needed
// setCurrentRunning -- method for saving the current running
// setIsRunning -- when there is active Running, the navigation to another screen should be blocked
// setGoal      -- methof for setting the goal distance
// setInterval  -- method for setting the goal interval
const ActionScreen = ({
  navigation,
  goal,
  interval,
  startDate,
  setCurrentRunning,
  setIsRunning,
  setGoal,
  setInterval
}) => {
  const [stopwatchStart, setStopwatchStart] = React.useState(false);
  const [averageSpeed, setAverageSpeed] = React.useState(0);
  const [currentSpeed, setCurrentSpeed] = React.useState(0);
  const [distance, setDistance] = React.useState(0);
  const [runCoordinates, setCoordinates] = React.useState([]);
  const [message, setMessage] = React.useState(null);
  const [visibleAlert, setVisibleAlert] = React.useState(false);
  const [watchPositionStatus, setWatchPositionStatus] = React.useState();
  const [almostReachedDistanceInformation, setAlmostReachedDistanceInformation] = useState(true);
  const [reachedDistanceInformation, setReachedDistanceInformation] = useState(true);

  // Vibrating message to the user
  const VIBRATINGMS = 500;
  const [tooSlow, setTooSlow] = React.useState(false);

  let timer;
  let almostTimer;
  let lastTm = 0;
  let arr = [];
  let warned = 0;
  let letDistance = 0;
  let first = 3;

  const LOCATION_SETTINGS = {
    accuracy: 6,
    distanceInterval: 0,
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

      let watchPositionStatus = await Location.watchPositionAsync(
        LOCATION_SETTINGS,
        updatePosition
      );

      setWatchPositionStatus(watchPositionStatus);

      if (interval) {
        this.almostTimer = setTimeout(almostPassedTime, 0.8 * interval);
        this.timer = setTimeout(passedTime, interval);
      }
    })();
  }, []);

  const updatePosition = (currLocation) => {
    if (arr.length) {
      const lastTimeStamp = arr[arr.length - 1].timestamp;
      const lastLocation = arr[arr.length - 1];
      const slow = 5;
      const currDistance = getDistance(lastLocation, currLocation.coords);
      currLocation.coords.speed = calculateAvg(
        currDistance,
        currLocation.timestamp - (lastTm ? lastTm : lastTimeStamp)
      );
      setAverageSpeed(
        calculateAvg(letDistance, currLocation.timestamp - arr[0].timestamp)
      );

      if (currDistance > 0.005 && currLocation.coords.speed < 40) {
        letDistance = toFixing(parseFloat(letDistance) + currDistance, 3);
        setDistance(letDistance);
        isStopped(!(currDistance > 0.005));
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
      if (goal !== null && goal * 0.95 <= letDistance && warned === 0) {
        warned = warned + 1;
        almostReachedDistance();
      }
      
      if (goal !== null && goal <= letDistance && warned === 1) {
        warned = warned + 1;
        reachedDistance();
      }
    } else {
      if (first === 0) {
        currLocation.coords.speed = 0;
        currLocation.coords.timestamp = currLocation.timestamp;
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
    setIsRunning(false);

    if (interval) {
      clearTimeout(this.timer);
      clearTimeout(this.almostTimer);
    }

    let arr2Saved = [];
    for (let i = 0; i < arr.length; i + 10) arr2Saved = [...arr2Saved, arr[i]];
    let currentRun = {
      runCoordinates: runCoordinates,
      avgSpeed: averageSpeed,
      topSpeed: Math.max.apply(
        Math,
        runCoordinates.map(function (coord) {
          return coord.speed;
        })
      ),
      time: getHHMMSS(Date.now() - runCoordinates[0].timestamp),
      timeStamp: Date.now() - runCoordinates[0].timestamp,
      distance: distance,
      setTime: interval,
      setDistance: goal,
      stopCounter : countStops(runCoordinates),
      startDate: startDate,
      maxAltitude: Math.max.apply(
        Math,
        runCoordinates.map(function (coord) {
          return coord.altitude;
        })
      ),
    };

    setInterval(null);
    setGoal(null);

    watchPositionStatus.remove();
    setCurrentRunning(currentRun);
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
    if (almostReachedDistanceInformation) {
      setMessage("You almost reached the previously set distance!");
      setAlmostReachedDistanceInformation(false);
      Vibration.vibrate(VIBRATINGMS);
      setVisibleAlert(true);
    }
  };

  const reachedDistance = () => {
    if (reachedDistanceInformation) {
      setMessage("You reached the previously set distance!");
      setReachedDistanceInformation(false);
      Vibration.vibrate(VIBRATINGMS);
      setVisibleAlert(true);
    }
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

            <MapComponent running={runCoordinates} detailsView={false} />
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
  interval: state.reducer.interval,
  goal: state.reducer.goal,
  startDate: state.reducer.startDate,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setInterval: (interval) =>
      dispatch({
        type: "SET_INTERVAL",
        payload: interval,
      }),

    setGoal: (distance) =>
      dispatch({
        type: "SET_DISTANCE",
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
