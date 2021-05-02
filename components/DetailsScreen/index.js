import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions
} from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row, Grid } from "react-native-paper-grid";
import Moment from 'moment';
import { Button } from "react-native-paper";
import { useState } from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import MapComponent from "../MapComponent";
import DialogInput from "react-native-dialog-input";
import Dialog from "react-native-dialog";
import ChartComponent from "./Chart"

const DetailsScreen = ({ navigation, currentRun, saveRunning }) => { 
const [isNameDialogVisible, setNameDialogVisible] = React.useState(false);
const [alreadySavedRunning, SetAlreadySavedRunning] = useState(false);
const [visibleAlert, setVisibleAlert] = React.useState(false);
const [index, setIndex] = React.useState(0);
const initialLayout = { width: Dimensions.get("window").width };

const MapTab = () => <MapComponent running={currentRun.runCoordinates}  detailsView={true} />;
const ChartTab = () => <View><Text><ChartComponent {...currentRun} /></Text></View>

const renderScene = SceneMap({
  first: MapTab,
  second: ChartTab,
});

const [routes] = React.useState([
  { key: "first", title: "Map" },
  { key: "second", title: "Chart" },
]);

useEffect(() => {
  Moment.locale('hu');
  if(currentRun.name !== "Default name") {
    SetAlreadySavedRunning(true);
  }
}, []);

const saveCurrentRunning = () => {
  saveRunning(currentRun);
  SetAlreadySavedRunning(true);
  setVisibleAlert(true);
}
return (
    <React.Fragment>
        <ScrollView>
          <View style={styles.pageTitleContainer}>
            <Text style={styles.pageTitle}>{(alreadySavedRunning && currentRun.name != "Default name" )? currentRun.name : "Your run"}</Text>
          </View>
          <Grid style={styles.gridStyle}>
            {currentRun.id == 0 &&  
            <Button
              icon={currentRun.name == "Default name" ? "close" : "check"}
              style={styles.setButton}
              disabled={alreadySavedRunning}
              onPress={() => setNameDialogVisible(true)}
            >
              <Text style={styles.buttonText}>Name of my run</Text>
            </Button>}
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
                <Text style={styles.primaryDataText}>Top speed</Text>
              </Col>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.secondaryDataText}>
                  {currentRun.topSpeed && currentRun.topSpeed.toFixed(3)} km/h
                </Text>
              </Col>
            </Row>

            <Row style={styles.paddingMarginZero}>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.secondaryDataText}>Average speed</Text>
              </Col>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.primaryDataText}>
                  {currentRun.avgSpeed && currentRun.avgSpeed.toFixed(3)} km/h
                </Text>
              </Col>
            </Row>
            <Row style={styles.paddingMarginZero}>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.primaryDataText}>Distance</Text>
              </Col>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.secondaryDataText}>{currentRun.distance} km</Text>
              </Col>
            </Row>

            {currentRun.setTime!=0 &&
            <Row style={styles.paddingMarginZero}>
              <Col style={styles.paddingMarginZero}>
                <View>
                  <Text style={styles.secondaryDataText}>Set time</Text>
                </View>
              </Col>
              <Col style={styles.paddingMarginZero}>
                <View>
                  <Text style={styles.primaryDataText}>{ Math.round(currentRun.setTime * 0.00001667,2) } min</Text>
                </View>
              </Col>
            </Row>
            }
            
            {currentRun.setDistance &&
            <Row style={styles.paddingMarginZero}>
              <Col style= {styles.paddingMarginZero}>
                <View>
                  <Text style={currentRun.setTime!=0?styles.primaryDataText:styles.secondaryDataText}>Set distance</Text>
                </View>
              </Col>
              <Col style={styles.paddingMarginZero}>
                <View>
                  <Text style={currentRun.setTime!=0?styles.secondaryDataText:styles.primaryDataText}>{currentRun.setDistance} km</Text>
                </View>
              </Col>
            </Row>
            }

            <Row style={styles.paddingMarginZero}>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.secondaryDataText}>Date (start)</Text>
              </Col>
              <Col style={styles.paddingMarginZero}>
                <Text style={styles.primaryDataText}>{Moment(currentRun.startDate).format('llll')}</Text>
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

                <SafeAreaView style={styles.contentContainer}>
                   <DialogInput
                    isDialogVisible={isNameDialogVisible}
                    title={"Name of my run"}
                    message={"Add name to your run!"}
                    hintInput={"Example run"}
                    submitInput={(inputText) => {
                      currentRun.name=inputText;
                      setNameDialogVisible(false);
                    }}
                    closeDialog={() => {
                      setNameDialogVisible(false);
                    }}
                  ></DialogInput>
                </SafeAreaView>
          </Grid>
        </ScrollView>
        <Dialog.Container
          visible={visibleAlert}
        >
          <Dialog.Title>
            Successfully saved!
          </Dialog.Title>
          <Dialog.Button label="ok" onPress={() => setVisibleAlert(false)}/>
        </Dialog.Container>
        { currentRun.id == 0 &&
          <Button
          onPress={saveCurrentRunning}
          style={styles.saveButton}
          disabled={alreadySavedRunning}
          mode="container"
          >
            <Text style={styles.saveButtonText}> Save running!</Text>
          </Button>
        }
    </React.Fragment>
  );
}


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
    paddingBottom:15,
    color: "black",
    backgroundColor: "#add8e6",
    textAlign: "center",
  },
  secondaryDataText: {
    paddingTop: 15,

    paddingBottom:15,
    color: "black",
    backgroundColor: "#E0E0E0",
    textAlign: "center",
    fontWeight: "800",
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

  saveButton: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: "orange",
    borderWidth: 5,
    borderColor: "orange",
    borderRadius: 10,
    height: 50
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
    height: 50
  },

  saveButtonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 15,
  }
});

const mapStateToProps = (state) => ({
  currentRun: state.reducer.currentRunning
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveRunning: (currentRun) =>
    dispatch({
      type: "SAVE_RUNNING",
      payload: {
        runCoordinates: currentRun.runCoordinates,
        name: currentRun.name,
        avgSpeed: currentRun.avgSpeed,
        topSpeed: currentRun.topSpeed,
        time: currentRun.time, 
        distance: currentRun.distance,
        setTime: currentRun.setTime,
        setDistance: currentRun.setDistance,
        startDate: currentRun.startDate,
        maxAltitude: currentRun.maxAltitude,
      },
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);