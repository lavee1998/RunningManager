import { ScrollView, View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { Component, useEffect } from "react";
import { Card, Title, Button, TextInput } from "react-native-paper";
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

  // Running types
  const runTypeList = [
    { value: 0, label: "Run based on time and distance", details: "Detail1" },
    { value: 1, label: "Run based on time", details: "Detail2" },
    { value: 2, label: "Run based on distance", details: "Detail3" },
    { value: 3, label: "Free run", details: "Detail4" },
  ];

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

        <Button
          icon={distance == 0 ? "close" : "check"}
          style={styles.setButton}
          onPress={() => setDistanceDialogVisible(true)}
        >
          <Text style={styles.buttonText}>Set distance</Text>
        </Button>

        <Button
          icon={hours == 0 && minutes == 0 ? "close" : "check"}
          style={styles.setButton}
          onPress={() => setTimeDialogVisible(true)}
        >
          <Text style={styles.buttonText}>Set time</Text>
        </Button>

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
            <Dialog.Input
              label="Hours"
              placeholder="0"
              defaultValue={hours}
              onChangeText={(hour) => setHours(hour)}
            ></Dialog.Input>
            <Dialog.Input
              label="Minutes"
              placeholder="0"
              defaultValue={minutes}
              onChangeText={(minute) => setMinutes(minute)}
            ></Dialog.Input>
            <Dialog.Button
              label="Cancel"
              onPress={() => {
                setTimeDialogVisible(false);
              }}
            />
            <Dialog.Button
              label="Submit"
              onPress={() => setTimeDialogVisible(false)}
            />
          </Dialog.Container>
        )}

        <Button
          onPress={handleStartRun}
          style={styles.startButton}
          mode="container"
        >
          {" "}
          <Text style={styles.startButtonText}> Start run!</Text>
        </Button>
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
