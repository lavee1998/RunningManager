//TODO for details
import {
    ScrollView,
    View,
    Text,
    SafeAreaView,
    StyleSheet
  } from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row, Grid } from "react-native-paper-grid";
import Moment from 'moment';
import { Button } from "react-native-paper";
import { useState } from "react";
  
const DetailsScreen = ({ navigation, currentRun, saveRunning }) => {
  const [alreadySavedRunning, SetAlreadySavedRunning] = useState(false);

  useEffect(() => {
    Moment.locale('hu');
  }, []);

  const saveCurrentRunning = () => {
    saveRunning(currentRun);
    SetAlreadySavedRunning(true);
  }

  return (
      <React.Fragment>
          <ScrollView>
          <View style={styles.pageTitleContainer}>
            <Text style={styles.pageTitle}>Daily run</Text>
          </View>
            <Grid style={styles.gridStyle}>
              <Row style={styles.paddingMarginZero}>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.primaryDataText}>Time</Text>
                </Col>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.secondaryDataText}>
                    {currentRun.time} min
                  </Text>
                </Col>
              </Row>
              <Row style={styles.paddingMarginZero}>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.secondaryDataText}>Maximum altitude</Text>
                </Col>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.primaryDataText}>
                    {currentRun.maxAltitude} m
                  </Text>
                </Col>
              </Row>
              <Row style={styles.paddingMarginZero}>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.primaryDataText}>Top speed</Text>
                </Col>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.secondaryDataText}>
                    {currentRun.topSpeed} km/h
                  </Text>
                </Col>
              </Row>

              <Row style={styles.paddingMarginZero}>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.secondaryDataText}>Average speed</Text>
                </Col>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.primaryDataText}>
                    {currentRun.avgSpeed} km/h
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
              <Row style={styles.paddingMarginZero}>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.secondaryDataText}>Set time</Text>
                </Col>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.primaryDataText}>{ Math.round(currentRun.setTime * 0.00001667,2) } min</Text>
                </Col>
              </Row>
              <Row style={styles.paddingMarginZero}>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.primaryDataText}>Set distance</Text>
                </Col>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.secondaryDataText}>{currentRun.setDistance} km</Text>
                </Col>
              </Row>
              <Row style={styles.paddingMarginZero}>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.secondaryDataText}>Date (start)</Text>
                </Col>
                <Col style={styles.paddingMarginZero}>
                  <Text style={styles.primaryDataText}>{Moment(currentRun.startDate).format('Do MMM YYYY hh:mm')}</Text>
                </Col>
              </Row>
              {currentRun.runCoordinates.length&&
              (
                  <SafeAreaView style={styles.contentContainer}> 
                    <MapComponent runCoordinates={currentRun.runCoordinates} />
                  </SafeAreaView>
              )
              }
            </Grid>
          </ScrollView>
          { currentRun.id == 0 &&
            <Button
            onPress={saveCurrentRunning}
            style={!alreadySavedRunning? styles.saveButton : styles.disabledSaveButton}
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
      padding: 15,
      color: "black",
      backgroundColor: "#add8e6",
      textAlign: "center",
    },
    secondaryDataText: {
      padding: 15,
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
          corrds: currentRun.coords,
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