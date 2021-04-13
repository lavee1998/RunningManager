import { ScrollView, View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { Component, useEffect } from "react";
import {
  Button,
  TextInput,
} from "react-native-paper";
import { connect, useDispatch } from "react-redux";
import DropDown from "react-native-paper-dropdown";
import DialogInput from "react-native-dialog-input";
import Dialog from "react-native-dialog";

// This component is the main component. Here the user can configure his/her running parameters
// navigation -- ??
const HomeScreen = ({ navigation, setInterval, setGoal, setStartDate }) => {
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [distance, setDistance] = React.useState(0);
  const [isDistanceDialogVisible, setDistanceDialogVisible] = React.useState(false);
  const [isTimeDialogVisible, setTimeDialogVisible] = React.useState(false);
  const [runType, setRunType] = React.useState(0);
  const [message, setMessage] = React.useState(null);
  const [visibleAlert, setVisibleAlert] = React.useState(false);
  const [notValidNumber, setNotValidNumber] = React.useState(false);

  const [alertAble, setAlertAble] = React.useState(false);
  // Running types
  const runTypeList = [
    { value: 0, label: "Run based on time and distance", 
        details: "In this option, an average speed will be calculated that you must maintain in order to reach your goal!" },
    { value: 1, label: "Run based on time", 
        details: "In this option, you can set goal time, it will be counted, and the application will warn you, that you reached 90% of goal time." },
    { value: 2, label: "Run based on distance", 
        details: "In this option, you can set goal distance, the application will give information to you, that you reached 90% of goal distance." },
    { value: 3, label: "Free run", 
        details: "In this case, you needn't set time or distance, just run as Forrest!" },
  ];
  useEffect(() => {
    setInterval=0;
  }, []);
  const handleStartRun = () => {
    if(distance) {
      setGoal(distance)
    }
    if(hours || minutes ){
      let milliseconds = hours*3600000 + minutes*60000
      setInterval(milliseconds)
    }

    let today = new Date();
    setStartDate(today)
    navigation.navigate("CountDown")
  }
  const hourValidator = (hour)=>
  {
    if(hour){
      setNotValidNumber(false);
      setHours(hour);
    }
    else{
     setNotValidNumber(true);
     setHours(0);
    }
  }
  const minuteValidator = (minute)=>
  {
    if(minute){
      setNotValidNumber(false);
      setMinutes(minute);
    }
    else{
     setNotValidNumber(true);
     setMinutes(0);
    }
  }
  const onAlert = () =>{
    if(alertAble){
      setVisibleAlert(true);
      if(runType==0)
        setMessage("Set both of goalparameter please!");
      else if(runType==1)
        setMessage("Set goal time please!");
      else 
        setMessage("Set goal distance please!");
    }
  }
  return (
    <ScrollView>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Get Started!</Text>
      </View>
      
      <SafeAreaView style={styles.containerStyle}>
          <DropDown 
            label={"Type of run"}
            mode={"outlined"}
            value={runType}
            setValue={setRunType}
            list={runTypeList}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => {setHours(0);setMinutes(0);setDistance(0);setInterval(0);setShowDropDown(false);}}
            inputProps={{
              right: 
              showDropDown?<TextInput.Icon name={"menu-up"} />:<TextInput.Icon name={"menu-down"} />,
            }}/>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>{runTypeList[runType].details}</Text>
        </View>
        {(runType==0||runType==2)&&
        <Button
          icon={distance == 0 ? "close" : "check"}
          style={styles.setButton}
          onPress={() => setDistanceDialogVisible(true)}
        >
          <Text style={styles.buttonText}>Set distance</Text>
        </Button>
        }
        {(runType==0||runType==1)&&
        <Button
          icon={hours == 0 && minutes == 0 ? "close" : "check"}
          style={styles.setButton}
          onPress={() => setTimeDialogVisible(true)}
        >
          <Text style={styles.buttonText}>Set time</Text>
        </Button>
        }
        {[0, 2].includes(runType) && (
          <DialogInput
            isDialogVisible={isDistanceDialogVisible}
            title={"Distance"}
            textInputProps={{ keyboardType: "numeric" }}
            message={"Please provide a distance (km):"}
            hintInput={"0.75"}
            submitInput={(inputText) => {
              setDistance(inputText);
              setDistanceDialogVisible(false);
            }}
            closeDialog={() => {
              setDistanceDialogVisible(false);
            }}
          ></DialogInput>
        )}

        {[0, 1].includes(runType) && (
          <Dialog.Container visible={isTimeDialogVisible}>
            <Dialog.Title>Time</Dialog.Title>
            {notValidNumber&&
            <Dialog.Description>
              Please provide valid number!
            </Dialog.Description>
            }
            <Dialog.Input
              label="Hours"
              placeholder="0"
              defaultValue={hours}
              onChangeText={(hour) => {!isNaN(hour)&&Math.floor(hour)==hour?hourValidator(hour):hourValidator(false)}}
            ></Dialog.Input>
            <Dialog.Input
              label="Minutes"
              placeholder="0"
              defaultValue={minutes}
              onChangeText={(minute) => {!isNaN(minute)&&Math.floor(minute)==minute?minuteValidator(minute):minuteValidator(false)}}
            ></Dialog.Input>
            <Dialog.Button
              label="Cancel"
              onPress={() => {
                setTimeDialogVisible(false);
              }}
            />
            <Dialog.Button
              label="Submit"
              onPress={() => {(Math.floor(minutes)==minutes&&minutes>=0)||(Math.floor(hours)==hours&&hours>=0)?setTimeDialogVisible(false):null}}
            />
          </Dialog.Container>
        )}

        <Button
          onPress={runType==0&&(distance==0||hours==0&&minutes==0)||runType==1&&hours==0&&minutes==0||runType==2&&distance==0?()=>{setAlertAble(true);onAlert();}:handleStartRun}
          style={styles.startButton}
          mode="container"
        >
          <Text style={styles.startButtonText}> Start run!</Text>
        </Button>
        <Dialog.Container
          visible={visibleAlert}
        >
          <Dialog.Title>
            Alert!
          </Dialog.Title>

          <Text>{message}</Text>
          <Dialog.Button label="ok" onPress={() => setVisibleAlert(false)}/>
        </Dialog.Container>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  dropdownStyle: {
     
    color: "black",
    fontWeight: "400",
  },
  pageTitleContainer: {
    flex: 0.8,
    backgroundColor: "#56CCf2",
    borderWidth: 5,
    width: "80%",
    borderColor: "#56CCf2",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 40,
    marginBottom: 40,
  },
  pageTitle: {
    alignSelf: "stretch",
    textAlign: "center",
    color: "white",
    fontSize: 22,
    padding: 20,
    fontWeight: "900",
  },

  detailsContainer: {
    backgroundColor: "orange",
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    borderColor: "orange",
    borderWidth: 5,
    borderRadius: 12,
  },
  detailsText: {
    color: "white",
    fontWeight: "400",
  },

  setButton: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "#E0E0E0",
    fontWeight: "700",
    color: "white",

    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    padding: 10,
    borderColor: "#56CCf2",
    borderWidth: 3,
    borderRadius: 8,
  },

  startButton: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "#56CCf2",
    borderWidth: 5,
    borderColor: "#56CCf2",
    borderRadius: 20,
    padding: 10,
  },

  startButtonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 20,
  },

  buttonText: {
    fontWeight: "800",
    color: "black",
    textShadowColor: "rgba(255, 255, 255, 1)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    shadowOpacity: 1,
    fontSize: 18,
  },
});

const mapStateToProps = (state /*, ownProps*/) => ({
  // interval: state.reducer.interval,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
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
    setStartDate: (date) =>
      dispatch({
        type: "SET_START_DATE",
        payload: date,
      }),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
