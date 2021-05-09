import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row, Grid } from "react-native-paper-grid";
import Moment from "moment";
import { Button } from "react-native-paper";
import { useState } from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import MapComponent from "../MapComponent";
import DialogInput from "react-native-dialog-input";
import Dialog from "react-native-dialog";
import {
  DistanceTimeChartComponent,
  SpeedChartComponent,
} from "./Chart";

// This component is responsible for displaying the running related data
// navigation   -- navigation
// currentRun   -- previously saved current Running
// saveRunning  -- method for saving the Running, when it is not already saved (e.g. when the users navigated here 
//                 from the ActionScreen and not the ListScreen)
const DetailsScreen = ({ navigation, currentRun, saveRunning }) => {
  const [isNameDialogVisible, setNameDialogVisible] = React.useState(false);
  const [alreadySavedRunning, SetAlreadySavedRunning] = useState(false);
  const [visibleAlert, setVisibleAlert] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const initialLayout = { width: Dimensions.get("window").width };

  useEffect(() => {
    Moment.locale("hu");

    // When the currentRun doesn't have any coordinates or its id is > 0 then the Save button should be disabled
    if (currentRun.id !== 0 || currentRun.runCoordinates.length == 0) {
      SetAlreadySavedRunning(true);
    }
  }, []);

  // Tabs
  const MapTab = () => (
    <MapComponent runningCoordinates={currentRun.runCoordinates} detailsView={true} />
  );

  const SpeedChart = () => (
    <View>
      <Text>
        <SpeedChartComponent {...currentRun} />
      </Text>
    </View>
  );

  const DistanceTimeChart = () => (
    <View>
      <Text>
        <DistanceTimeChartComponent {...currentRun} />
      </Text>
    </View>
  );

  // Routes for the TabView
  const renderSceneForFreeRunning = SceneMap({
    first: MapTab,
    second: SpeedChart,
  });

  const renderSceneForNonFreeRunning = SceneMap({
    first: MapTab,
    second: SpeedChart,
    third: DistanceTimeChart,
  });

  const [routesForFreeRunning] = React.useState([
    { key: "first", title: "Map" },
    { key: "second", title: "Speed chart" }
  ]);

  const [routesForNonFreeRunning] = React.useState([
    { key: "first", title: "Map" },
    { key: "second", title: "Speed chart" },
    { key: "third", title: "Achievement"} // When the user previously set a Time/Distance an Achievement Tab will be displayed too
  ]);

  // Saving the Current Running to the permanent memory
  const saveCurrentRunning = () => {
    saveRunning(currentRun);
    SetAlreadySavedRunning(true);
    setVisibleAlert(true);
  };

  return (
    <React.Fragment>
      <ScrollView>
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>
            {alreadySavedRunning && currentRun.name != "Default name" ? currentRun.name : "Your run"}
          </Text>
        </View>
        <Grid style={styles.gridStyle}>
          {currentRun.id == 0 && (
            <Button
              icon={currentRun.name == "Default name" ? "close" : "check"}
              style={styles.setButton}
              disabled={alreadySavedRunning}
              onPress={() => setNameDialogVisible(true)}
            >
              <Text style={styles.buttonText}>Name of my run</Text>
            </Button>
          )}
          <Row style={styles.paddingMarginZero}>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.primaryDataText}>Time</Text>
            </Col>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.secondaryDataText}>
                {currentRun.time && currentRun.time}
              </Text>
            </Col>
          </Row>
          <Row style={styles.paddingMarginZero}>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.secondaryDataText}>Maximum altitude</Text>
            </Col>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.primaryDataText}>
                {currentRun.maxAltitude && currentRun.maxAltitude.toFixed(3)} m
              </Text>
            </Col>
          </Row>
          <Row style={styles.paddingMarginZero}>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.primaryDataText}>Maximum altitude difference</Text>
            </Col>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.secondaryDataText}>
                {currentRun.altitudeDifference.toFixed(3)} m
              </Text>
            </Col>
          </Row>
          <Row style={styles.paddingMarginZero}>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.secondaryDataText}>Top speed</Text>
            </Col>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.primaryDataText}>
                {currentRun.topSpeed && currentRun.topSpeed.toFixed(3)} km/h
              </Text>
            </Col>
          </Row>

          <Row style={styles.paddingMarginZero}>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.primaryDataText}>Average speed</Text>
            </Col>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.secondaryDataText}>
                {currentRun.avgSpeed && currentRun.avgSpeed.toFixed(3)} km/h
              </Text>
            </Col>
          </Row>
          <Row style={styles.paddingMarginZero}>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.secondaryDataText}>Distance</Text>
            </Col>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.primaryDataText}>
                {currentRun.distance} km
              </Text>
            </Col>
          </Row>

          <Row style={styles.paddingMarginZero}>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.primaryDataText}>Date (start)</Text>
            </Col>
            <Col style={styles.paddingMarginZero}>
              <Text style={styles.secondaryDataText}>
                {Moment(currentRun.startDate).format("llll")}
              </Text>
            </Col>
          </Row>

          {!!currentRun.stopCounter && (
            <Row style={styles.paddingMarginZero}>
              <Col style={styles.paddingMarginZero}>
                <View>
                  <Text style={styles.secondaryDataText}>
                    Number of the stops
                  </Text>
                </View>
              </Col>
              <Col style={styles.paddingMarginZero}>
                <View>
                  <Text style={styles.primaryDataText}>
                    {currentRun.stopCounter} 
                  </Text>
                </View>
              </Col>
            </Row>
          )}

          {currentRun.goalInterval > 0 && (
            <Row style={styles.paddingMarginZero}>
              <Col style={styles.paddingMarginZero}>
                <View>
                  <Text style={!!currentRun.stopCounter ? styles.primaryDataText : styles.secondaryDataText}>
                    Goal Interval
                  </Text>
                </View>
              </Col>
              <Col style={styles.paddingMarginZero}>
                <View>
                  <Text style={!!currentRun.stopCounter ? styles.secondaryDataText : styles.primaryDataText}>
                    {Math.round(currentRun.goalInterval * 0.00001667, 2)} min
                  </Text>
                </View>
              </Col>
            </Row>
          )}

          {currentRun.goalDistance > 0 && (
            <Row style={styles.paddingMarginZero}>
              <Col style={styles.paddingMarginZero}>
                <View>
                  <Text style={(currentRun.goalInterval > 0 && !!currentRun.stopCounter) ? styles.secondaryDataText : styles.primaryDataText}>
                    Goal Distance
                  </Text>
                </View>
              </Col>
              <Col style={styles.paddingMarginZero}>
                <View>
                  <Text style={(currentRun.goalInterval > 0 && !!currentRun.stopCounter) ? styles.primaryDataText : styles.secondaryDataText}>
                    {currentRun.goalDistance} km
                  </Text>
                </View>
              </Col>
            </Row>
          )}

          {currentRun.runCoordinates.length != 0 && (
            <Row style={styles.paddingMarginZero}>
              <TabView
                navigationState={
                  currentRun.goalInterval || currentRun.goalDistance
                    ? { index, routes: routesForNonFreeRunning }
                    : { index, routes: routesForFreeRunning }
                }
                renderScene={
                  currentRun.goalInterval || currentRun.goalDistance
                    ? renderSceneForNonFreeRunning
                    : renderSceneForFreeRunning
                }
                onIndexChange={setIndex}
                initialLayout={initialLayout}
              />
            </Row>
          )}

          <SafeAreaView style={styles.contentContainer}>
            <DialogInput
              isDialogVisible={isNameDialogVisible}
              title={"Name of my run"}
              message={"Add name to your run!"}
              hintInput={"Example run"}
              submitInput={(inputText) => {
                currentRun.name = inputText;
                setNameDialogVisible(false);
              }}
              closeDialog={() => {
                setNameDialogVisible(false);
              }}
            ></DialogInput>
          </SafeAreaView>
        </Grid>
      </ScrollView>
      <Dialog.Container visible={visibleAlert}>
        <Dialog.Title>Successfully saved!</Dialog.Title>
        <Dialog.Button label="ok" onPress={() => setVisibleAlert(false)} />
      </Dialog.Container>

      {currentRun.id == 0 && (
        <Button
          onPress={saveCurrentRunning}
          style={styles.saveButton}
          disabled={alreadySavedRunning}
          mode="container"
        >
          <Text style={styles.saveButtonText}> Save running!</Text>
        </Button>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  scene: {
    backgroundColor: "#ff4081",
    flex: 1,
  },

  gridStyle: {
    margin: 0,
    padding: 0,
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

  pageTitleContainer: {
    flex: 0.8,
    backgroundColor: "#56CCf2",
    borderWidth: 5,
    width: "80%",
    borderColor: "#56CCf2",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 40,
    marginBottom: 20,
  },

  pageTitle: {
    alignSelf: "stretch",
    textAlign: "center",
    color: "white",
    fontSize: 22,
    padding: 20,
    fontWeight: "900",
  },

  primaryDataText: {
    paddingTop: 15,
    paddingBottom: 15,
    color: "black",
    backgroundColor: "#add8e6",
    textAlign: "center",
  },

  secondaryDataText: {
    paddingTop: 15,
    paddingBottom: 15,
    color: "black",
    backgroundColor: "#E0E0E0",
    textAlign: "center",
    fontWeight: "800",
  },

  saveButton: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: "orange",
    borderWidth: 5,
    borderColor: "orange",
    borderRadius: 10,
    height: 50,
  },

  disabledSaveButton: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: "navajowhite",
    borderWidth: 5,
    borderColor: "navajowhite",
    borderRadius: 10,
    height: 50,
  },

  saveButtonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 15,
  },
});

const mapStateToProps = (state) => ({
  currentRun: state.reducer.currentRunning,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveRunning: (currentRun) =>
      dispatch({
        type: "SAVE_RUNNING",
        payload: {
          ...currentRun,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
