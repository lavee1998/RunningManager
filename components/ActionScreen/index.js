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
// import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import { Card, Title, Button, TextInput } from "react-native-paper";
import RNSpeedometer from "react-native-speedometer";
import { TabView, SceneMap } from "react-native-tab-view";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Col, Row, Grid } from "react-native-paper-grid";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import MapComponent from "../MapComponent"
import haversine from "haversine"
// import Geolocation from 'react-native-geolocation-service';


// This component is responsible for the main running process
// navigation -- ??
const ActionScreen = ({ navigation }) => {
  const [isCompleted, setCompleted] = React.useState(false);
  const [stopwatchStart, setStopwatchStart] = React.useState(false);
  const [stopwatchReset, setStopwatchReset] = React.useState(false);
  const [averageSpeed, setAverageSpeed] = React.useState(40);
  const [currentSpeed, setCurrentSpeed] = React.useState(0);
  const [currenTime, setCurrentTime] = React.useState();
  const [distance, setDistance] = React.useState(0);
  const initialLayout = { width: Dimensions.get("window").width };
  const [text, setText] = React.useState("Waiting...");
  const [index, setIndex] = React.useState(0);
  const [runCoordinates, setCoordinates] = React.useState([]);
  const [location, setLocation] = useState();
  const [watchPosState, setPosState] = useState()
  const [errorMsg, setErrorMsg] = useState(null);
  const [routes] = React.useState([
    { key: "first", title: "Speedometer" },
    { key: "second", title: "Map" },
  ]);

  const MapTab = () => <MapComponent runCoordinates={runCoordinates} />

  const Speedometer = () => <RNSpeedometer minValue={0} maxValue={  ((averageSpeed * 2) > currentSpeed) ? averageSpeed:40} value={currentSpeed} />;

  const renderScene = SceneMap({
    first: Speedometer,
    second: MapTab,
  });

  // ----------------------- METHODS ----------------------------
  useEffect(() => {

    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMsg('Permission to access location was denied')

    } else {
      setInterval(() => getLocationAsync(), 5000);
    }
    // (async () => {
    //   let { status } =  await Location.requestPermissionsAsync();
    //   if (status !== "granted") {
    //     setErrorMsg("Permission to access location was denied");
    //     return;
    //   }

    //    let watchId =  Location.watchPositionAsync(
    //     {  },
    //     updatePosition,
    //   );
    //   // setPosState(posState)

    //   console.log(runCoordinates.length, "runcor-length-test")
    // })();
  }, []);

  let myarray = []

  const getLocationAsync = async () => {
    let distance2 = 0
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')

    }

    let currLocation = await Location.getCurrentPositionAsync({});
    console.log( runCoordinates.length, runCoordinates, "runCoordinates-test")

    if (runCoordinates.length !== 0) {
      let lastLocation = runCoordinates[runCoordinates.length - 1];
      console.log(lastLocation, "lastlocation-test");
      let start = {
        latitude: lastLocation.latitude,
        longitude: lastLocation.longitude
      }
      let end = {
        latitude: currLocation.coords.latitude,
        longitude: currLocation.coords.longitude
      }

      let currDistance = haversine(start, end, { unit: 'kilometer' }) || 0;
      console.log(currDistance, distance2, distance2 + Math.round(currDistance * 1000) / 1000, "curr-distance-test");
      distance2 = (Math.round((parseFloat(distance2) + (Math.round(currDistance * 1000) / 1000)) * 1000) / 1000) || 0;
      setDistance(distance2 + distance);

      let sumSpeed = 0
      runCoordinates.forEach(corr => {
        sumSpeed = sumSpeed + corr.speed
      });
      let avgSpeed = sumSpeed / (runCoordinates.length)
      console.log("avgSpeed-test",avgSpeed)

      setAverageSpeed(avgSpeed)

    }
    else {
      setAverageSpeed(currLocation.coords.speed )
    }
    myarray = [...runCoordinates]
    myarray.push(currLocation.coords)
    console.log(myarray)
    setCoordinates(myarray)
  };



  const updatePosition = (currLocation) => {
    let distance2 = 0;
    //console.log(runCoordinates, "runcoordinates-test", runCoordinates.length, currLocation)

    console.log("zet is", Object.values(runCoordinates), "zet is")
    if (runCoordinates.length !== 0) {
      const lastLocation = runCoordinates[runCoordinates.length - 1];//last coordinate
      console.log(lastLocation, "lastlocation-test");
      let start = {
        latitude: lastLocation.latitude,
        longitude: lastLocation.longitude
      }
      let end = {
        latitude: currLocation.coords.latitude,
        longitude: currLocation.coords.longitude
      }

      let currDistance = haversine(start, end, { unit: 'kilometer' }) || 0;
      console.log(currDistance, distance2, distance2 + Math.round(currDistance * 1000) / 1000, "curr-distance-test");
      distance2 = Math.round((parseFloat(distance2) + (Math.round(currDistance * 1000) / 1000)) * 1000) / 1000;
      setDistance(distance2);
      setCoordinates([currLocation.coords])
      setCoordinates((prevState) => ([...prevState, currLocation.coords]))

    }
    else {
      setCoordinates((prevState) => ([...prevState, currLocation.coords]))

    }
    // setCoordinates(runCoordinates.push(currLocation));

    setCurrentSpeed(currLocation.coords.speed);
  };



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
    watchPosState.remove()
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

            <Grid style={styles.paddingMarginZero}>
              <Button
                onPress={() => stopRunning()}
                style={styles.stopButton}
                mode="container"
              >
                <Text style={styles.stopButtonText}> Stop run!</Text>
              </Button>

              <Row style={styles.container}>

              </Row>
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
              <Row style={styles.paddingMarginZero}>
                <TabView
                  navigationState={{ index, routes }}
                  renderScene={renderScene}
                  onIndexChange={setIndex}
                  initialLayout={initialLayout}
                />
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
