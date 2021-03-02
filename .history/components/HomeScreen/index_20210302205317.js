import {
  ScrollView,
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import React, { Component, useEffect } from "react";
import { Card, Title, Button, TextInput } from "react-native-paper";
import { connect, useDispatch } from "react-redux";
import DropDown from "react-native-paper-dropdown";
import { TimePickerModal } from "react-native-paper-dates";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import DialogInput from "react-native-dialog-input";

const HomeScreen = () => {
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [interval, setInterval] = React.useState({
    interval: {
      hours: 0,
      minutes: 0,
    },
  });
  const [hours, setHours] = React.useState();
  const [minutes, setMinutes] = React.useState();
  // const [interval, setInterval] = useState("");
  // const [value, onChange] = useState("00:00:00");

  const [open, setOpen] = React.useState(true);

  const [visible, setVisible] = React.useState(false);
  const [stopwatchStart, setStopwatchStart] = React.useState(false);
  const [stopwatchReset, setStopwatchReset] = React.useState(false);
  const [distance, setDistance] = React.useState(4.1);
  const [isDialogVisible, setDialogVisible] = React.useState(false);
  const [currenTime, setCurrentTime] = React.useState();
  const [runType, setRunType] = React.useState(0);

  // Set Intervall methods
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(({ hours, minutes }) => {
    setInterval({
      interval: {
        hours: hours,
        minutes: minutes,
      },
    });

  
    setVisible(false);
    console.log({ hours, minutes });
  }, []);

  //stopwatch methods

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

  const runTypeList = [
    { value: 0, label: "Run based on time and distance", details: "Detail1" },
    { value: 1, label: "Run based on time", details: "Detail2" },
    { value: 2, label: "Run based on distance", details: "Detail3" },
    { value: 3, label: "Free run", details: "Detail4" },
  ];

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
          onDismiss={() => setShowDropDown(false)}
          inputProps={{
            right: <TextInput.Icon name={"menu-down"} />,
          }}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>{runTypeList[runType].details}</Text>
        </View>
        {
          <Button
            icon={distance == 0 ? "close" : "check"}
            style={styles.setButton}
            onPress={() => setDialogVisible(true)}
          >
            <Text style={styles.buttonText}>Set distance</Text>
          </Button>
        }

        <Button
          // icon={
          //   interval.interval.hours == 0 && interval.interval.minutes == 0
          //     ? "close"
          //     : "check"
          // }
          icon="timer-outline"
          style={styles.setButton}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.buttonText}>Set time</Text>
        </Button>
        <View>
          <Text>{interval}</Text>
        </View>

        <DialogInput
          isDialogVisible={isDialogVisible}
          title={"DialogInput 1"}
          textInputProps={{ keyboardType: "numeric" }}
          message={"Message for DialogInput #1"}
          hintInput={"HINT INPUT"}
          submitInput={(inputText) => {
            setDistance(inputText);
            setDialogVisible(false);
          }}
          closeDialog={() => {
            setDialogVisible(false);
          }}
        ></DialogInput>

        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={24} // default: current hours
          minutes={60} // default: current minutes
          label="Select running time" // optional, default 'Select time'
          cancelLabel="Cancel" // optional, default: 'Cancel'
          confirmLabel="Ok" // optional, default: 'Ok'
          animationType="fade" // optional, default is 'none'
          locale={"hu"} // optional, default is automically detected by your system
        />

        <Button mode="container">Start run!</Button>

        <TouchableHighlight onPress={() => toggleStopwatch()}>
          <Text style={{ fontSize: 30 }}>
            {stopwatchStart ? "Stop" : "Start"}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => resetStopwatch()}>
          <Text style={{ fontSize: 30 }}>Reset</Text>
        </TouchableHighlight>
        <Stopwatch
          laps
          msecs
          start={stopwatchStart}
          reset={stopwatchReset}
          options={options}
          getTime={(time) => getFormattedTime(time)}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const options = {
  container: {
    backgroundColor: "#000",
    padding: 5,
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
  containerStyle: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "center",
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

export default HomeScreen;
