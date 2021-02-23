import { ScrollView, View, Image, Text, TouchableHighlight } from "react-native";
import React, { Component, useEffect } from "react";
import { Card, Title, Button, TextInput } from "react-native-paper";

import { connect, useDispatch } from "react-redux";
import DropDown from "react-native-paper-dropdown";
import { TimePickerModal } from "react-native-paper-dates";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";

const HomeScreen = () => {
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [interval, setInterval] = React.useState();
  // const [interval, setInterval] = useState("");
  // const [value, onChange] = useState("00:00:00");

  const [open, setOpen] = React.useState(true);

  const [visible, setVisible] = React.useState(false);
  const [stopwatchStart, setStopwatchStart] = React.useState(false);
  const [stopwatchReset, setStopwatchReset] = React.useState(false);

  // Set Intervall methods
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setInterval(JSON.stringify({ hours, minutes }));
      let checkInterval = JSON.parse(interval);
      console.log(
        "interval-check",
        interval,
        checkInterval.hours,
        checkInterval.minutes
      );
      setVisible(false);
      console.log({ hours, minutes });
    },
    [setVisible]
  );

  //stopwatch methods

  const toggleStopwatch = () => {
    setStopWatchStart(!stopwatchStart);
    setStopWatchReset(false);
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false,
    });
  };

  const resetStopwatch = () => {
    setStopWatchStart(false);
    setStopWatchReset(true);
  };

  const getFormattedTime = (time) => {
    this.currentTime = time;
  };

  const [runType, setRunType] = React.useState(0);

  const runTypeList = [
    { value: 0, label: "Run based on time and distance" },
    { value: 1, label: "Run based on time" },
    { value: 2, label: "Run based on distance" },
    { value: 3, label: "Free run" },
  ];

  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Card>
          <Card.Title title="Please set your details" />
          <Card.Content>
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

            <TouchableHighlight onPress={()=>toggleStopwatch}>
          <Text style={{fontSize: 30}}>{stopwatchStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => resetStopwatch}>
          <Text style={{fontSize: 30}}>Reset</Text>
        </TouchableHighlight>
            <Stopwatch
              laps
              msecs
              start={stopwatchStart}
              reset={stopwatchReset}
              options={options}
              getTime={() => getFormattedTime}
            />

            <Button
              mode="contained"
              icon="timer-outline"
              onPress={() => setVisible(true)}
            >
              Pick time
            </Button>
            <Text>Home!</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
