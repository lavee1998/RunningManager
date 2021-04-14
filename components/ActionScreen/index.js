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
  const [distance, setDistance] = React.useState(0);
  const initialLayout = { width: Dimensions.get("window").width };
  const [text, setText] = React.useState("Waiting...");
  const [index, setIndex] = React.useState(0);
  const [runCoordinates, setCoordinates] = React.useState([]);
  const [message, setMessage] = React.useState(null);
  const [visibleAlert, setVisibleAlert] = React.useState(false);
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [watchPositionStatus, setWatchPositionStatus] = React.useState()
  const [almostReachedDistanceInformation, setAlmostReachedDistanceInformation] = useState(true);
  const [reachedDistanceInformation, setReachedDistanceInformation] = useState(true);
  const [almostReachedTimeInformation, setAlmostReachedTimeInformation] = useState(true);
  const [reachedTimeInformation, setReachedTimeInformation] = useState(true);
  // Vibrating message to the user
  const VIBRATINGMS = 500;

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
  let timer;
  let almostTimer;
  // ----------------------- METHODS ----------------------------
  
  const LOCATION_SETTINGS = {accuracy:6,
    distanceInterval:0, timeInterval:4000
  }
  useEffect(() => {
    toggleStopwatch();
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

      setWatchPositionStatus(watchPositionStatus)

      if (interval) {
        this.almostTimer = setTimeout(almostPassedTime, 0.8 * interval);
        this.timer = setTimeout(passedTime, interval);
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
    if(almostReachedDistanceInformation) {
      setMessage("Hamarosan célba érsz!");
      setAlmostReachedDistanceInformation(false);
      Vibration.vibrate(VIBRATINGMS);
      setVisibleAlert(true);
    }
  };

  const reachedDistance = () => {
    if(reachedDistanceInformation) {
      setMessage("Elérted a kívánt útmennyiséget!");
      setReachedDistanceInformation(false);
      Vibration.vibrate(VIBRATINGMS);
      setVisibleAlert(true);
    }
  };

  const tooSlow=(slow)=>{
    if(slow){
      console.log("lassú");
    }
    else{
      console.log("Nem lassú");
    }
  }
  const isStopped=(stopped)=>{
    if(stopped){
      console.log("állsz");
    }
    else{
      console.log("mész");
    }
  }
  const toFixing=(num,dec)=>{
    const decimal=Math.pow(10,dec);
    return Math.floor(num*decimal)/decimal;
  }

  let arr = [];
  let warned = 0;
  let letDistance=0;

  const calculateAvg=(dist,timeInt)=>{
    return toFixing((parseFloat(dist)/
    (Math.abs(parseFloat(timeInt )) /3600000)),1);
  }

  const getDistance=(startLoc,endLoc)=>{
    let start = {
      latitude: startLoc.latitude,
      longitude: startLoc.longitude,
    };
    let end = {
      latitude: endLoc.latitude,
      longitude: endLoc.longitude,
    };
   
    const dist=haversine(start, end, { unit: "kilometer" });
        return dist;
    
  }
  const updatePosition = (currLocation) => {
      if (arr.length !== 0) {
        const lastTimeStamp = arr[arr.length - 1].timestamp; 
        const lastLocation = arr[arr.length - 1];
        
        const currDistance= getDistance(lastLocation,currLocation.coords);

        
        currLocation.coords.speed = calculateAvg(currDistance,currLocation.timestamp-lastTimeStamp);
        setAverageSpeed(calculateAvg(letDistance,currLocation.timestamp-arr[0].timestamp));
        if(currDistance>0.005){
          letDistance =toFixing((parseFloat(letDistance) + currDistance),3) ;
          setDistance(letDistance);
          isStopped(!(currDistance>0.005));
        }
        if(currLocation.coords.speed<40){
          
       
          currLocation.coords.timestamp= currLocation.timestamp;
          arr = [...arr, currLocation.coords];

          const slow=5;
          if(arr.length>4){ //moving avg
            let currD=0;
            for(let i=1;i<3;i++)
            {
              currD=parseFloat(currD)+getDistance( arr[arr.length - i],arr[arr.length - i-1]);
            }
            
            arr[arr.length-1].speed= calculateAvg(currD ,  arr[arr.length - 1].timestamp-arr[arr.length - 3].timestamp); //interpolated curr speed
            setCurrentSpeed(arr[arr.length-1].speed);
            tooSlow(arr[arr.length-1].speed<slow);
          } else  setCurrentSpeed(0);
          
          setCoordinates(arr);
        } 

        if (goal * 0.95 <= letDistance&& warned===0) {
          warned=warned+1;
          almostReachedDistance();
        }
        if (goal <= letDistance&&warned===1) {
          warned=warned+1;
          reachedDistance();
        }
      }else{
        currLocation.coords.speed=0 ;
        currLocation.coords.timestamp= currLocation.timestamp;
        arr = [...arr, currLocation.coords];
        setCoordinates(arr);
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

  const getHHMMSS=(ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms  / 1000 / 3600 ) % 24)
  
    const humanized = [
      hours<10?"0"+hours.toString():hours.toString(),
      minutes<10?"0"+minutes.toString():minutes.toString(),
      seconds<10?"0"+seconds.toString():seconds.toString(),
    ].join(':');
  
    return humanized;
  }
  const stopRunning = () => {
    toggleStopwatch();
    //addToRuns(runCoordinates)
    clearTimeout(this.timer);
    clearTimeout(this.almostTimer);
    let currentRun = {
      runCoordinates: runCoordinates,
      avgSpeed: averageSpeed,
      topSpeed: Math.max.apply(
        Math,
        runCoordinates.map(function (coord) {
          return coord.speed;
        })
      ),
      time: getHHMMSS(Date.now()-runCoordinates[0].timestamp),
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
    console.log(runCoordinates, "runCoordinates-action-test")
    watchPositionStatus.remove()
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
              />
            </Row>
            <Row style={styles.paddingMarginZero}>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.primaryDataText}>Average Speed</Text>
              </Col>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.secondaryDataText}>{averageSpeed.toFixed(1)} km/h</Text>
              </Col>
            </Row>
            <Row style={styles.paddingMarginZero}>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.primaryDataText}>Current Speed</Text>
              </Col>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.secondaryDataText}>{currentSpeed.toFixed(1)} km/h</Text>
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
            <MapComponent running={runCoordinates} detailsView={false}/>

            {/* <Row style={styles.paddingMarginZero}>
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
              />
            </Row> */}
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
