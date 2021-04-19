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
import getDistance from "./getDistance";
import isStopped from "./isStopped";
import getHHMMSS from "./getHHMMSS";
import toFixing from "./toFixing";
import calculateAvg from "./calculateAvg";
const ActionScreen = ({
  navigation,
  goal,
  interval,
  startDate,
  setCurrentRunning,
  setIsRunning, //WIP
}) => {
  const [stopwatchStart, setStopwatchStart] = React.useState(false);
  const [averageSpeed, setAverageSpeed] = React.useState(0);
  const [currentSpeed, setCurrentSpeed] = React.useState(0);
  const [distance, setDistance] = React.useState(0);
  const [runCoordinates, setCoordinates] = React.useState([]);
  const [message, setMessage] = React.useState(null);
  const [visibleAlert, setVisibleAlert] = React.useState(false);
  const [watchPositionStatus, setWatchPositionStatus] = React.useState();
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
    //timeInterval: 2000,
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
        almostTimer = setTimeout(almostPassedTime, 0.8 * interval);
        timer = setTimeout(passedTime, interval);
      } //clearTimeout(timer)
    })();
  }, []);

  const passedTime = () => {
    if (reachedTimeInformation) {
      setMessage("Time is over! You reached the previously set distance.");
      setReachedTimeInformation(false);
      Vibration.vibrate(VIBRATINGMS);
      setVisibleAlert(true);
    }
  };

  const almostPassedTime = () => {
    if (almostReachedTimeInformation) {
      setMessage("The time is almost over!");
      setAlmostReachedTimeInformation(false);
      Vibration.vibrate(VIBRATINGMS);
      setVisibleAlert(true);
    }
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

      if (currDistance > 0.005 && currLocation.coords.speed < 40) {
        letDistance = toFixing(parseFloat(letDistance) + currDistance, 3);
        setDistance(letDistance);
        isStopped(!(currDistance > 0.005));
        lastTm = 0;
        currLocation.coords.timestamp = currLocation.timestamp;
        arr = [...arr, currLocation.coords];
      } else {
        if (!lastTm) lastTm = arr[arr.length - 1].timestamp;
        currLocation.coords.accuracy=arr[arr.length - 1].accuracy;
        currLocation.coords.altitude=arr[arr.length - 1].altitude;
        currLocation.coords.altitudeAccuracy=arr[arr.length - 1].altitudeAccuracy;
        currLocation.coords.heading=arr[arr.length - 1].heading;
        currLocation.coords.latitude=arr[arr.length - 1].latitude;
        currLocation.coords.longitude=arr[arr.length - 1].longitude;
        currLocation.coords.timestamp = currLocation.timestamp;
        arr = [...arr, currLocation.coords];
      }
      if (currLocation.coords.speed < 40) {
        const slow = 5;

        if (arr.length > 7) {
          //moving avg
          let currD = 0;
          for (let i = 1; i < 6; i++) {
            currD =
              parseFloat(currD) +
              getDistance(arr[arr.length - i], arr[arr.length - i - 1]);
          }
          arr[arr.length - 1].speed = calculateAvg(
            currD,
            arr[arr.length - 1].timestamp - arr[arr.length - 7].timestamp
          ); //interpolated curr speed
          setCurrentSpeed(arr[arr.length - 1].speed);
          setTooSlow(arr[arr.length - 1].speed < slow);
        } else arr[arr.length-1].speed = 0;

        setCoordinates(arr);
      }

      if (goal * 0.95 <= letDistance && warned === 0) {
        warned = warned + 1;
        almostReachedDistance();
      }
      if (goal <= letDistance && warned === 1) {
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
    setAlmostReachedDistanceInformation(false);
    setReachedTimeInformation(false);
    setAlmostReachedTimeInformation(false);
    setReachedTimeInformation(false);
  };

  const stopRunning = () => {
    toggleStopwatch();
    setIsRunning(false);
    //addToRuns(runCoordinates)
    if (interval) {
      clearTimeout(timer);
      clearTimeout(almostTimer);
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
      distance: distance,
      setTime: interval, //settime
      setDistance: goal, //setDistance
      startDate: startDate,
      maxAltitude: Math.max.apply(
        Math,
        runCoordinates.map(function (coord) {
          return coord.altitude;
        })
      ),
    };
    console.log(runCoordinates, "runCoordinates-action-test");
    watchPositionStatus.remove();
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
              <Stopwatch laps msecs start={stopwatchStart} options={options} />
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
            <Row style={styles.speedometerrow}>
              <RNSpeedometer
                maxValue={
                 currentSpeed > 40 ? 100 : 40
                }
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
  speedometerrow: {
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
    setIsRunning: (isRunning) =>
      dispatch({
        type: "SET_IS_RUNNING",
        payload: isRunning,
      }),
    setCurrentRunning: (currentRun) =>
      dispatch({
        type: "SAVE_CURRENTRUNNING",
        payload: {
          id: currentRun.id,
          runCoordinates: currentRun.runCoordinates,
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
