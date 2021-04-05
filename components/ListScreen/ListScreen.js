import { ScrollView, View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { Component, useEffect } from "react";
import { Card, Title, Button, TextInput } from "react-native-paper";
import { Col, Row, Grid } from "react-native-paper-grid";
import ListRow from "./ListRow"
import { connect } from "react-redux";

// This component is the main component. Here the user can configure his/her running parameters
// navigation -- ??
const ListScreen = ({ navigation, runnings , removeRun, }) => {
  const [selectedRunningId, setSelectedRunningId] = React.useState(0);

  //console.log(runnings, "test")

  return (
    <ScrollView>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Your runs</Text>
      </View>

      <SafeAreaView style={styles.containerStyle}>
        <Grid style={styles.gridStyle}>
          {
          runnings.length && runnings.map((run, i) => {
            console.log(run)
            return(
              
             <ListRow run={run} i={i} /> 
          )})}
            {/* <Row style={styles.paddingMarginZero}>
                    <Col style={styles.paddingMarginZero}>
                      <Text style={styles.primaryDataText}>example 1</Text>
                    </Col>
                    <Col style={styles.paddingMarginZero}>
                      <Text style={styles.primaryDataText}>
                        array[1]
                      </Text>
                    </Col>
                  </Row>
                  <Row style={styles.paddingMarginZero}>
                    <Col style={styles.paddingMarginZero}>
                      <Text style={styles.secondaryDataText}>example 2</Text>
                    </Col>
                    <Col style={styles.paddingMarginZero}>
                      <Text style={styles.secondaryDataText}>
                        array[2]
                      </Text>
                    </Col>
                  </Row>
                  <Row style={styles.paddingMarginZero}>
                    <Col style={styles.paddingMarginZero}>
                      <Text style={styles.primaryDataText}>example 3</Text>
                    </Col>
                    <Col style={styles.paddingMarginZero}>
                      <Text style={styles.primaryDataText}>
                        array[3]
                      </Text>
                    </Col>
                  </Row>
                  <Row style={styles.paddingMarginZero}>
                    <Col style={styles.paddingMarginZero}>
                      <Text style={styles.secondaryDataText}>example 4</Text>
                    </Col>
                    <Col style={styles.paddingMarginZero}>
                      <Text style={styles.secondaryDataText}>
                        array[4]
                      </Text>
                    </Col>
                  </Row> */}
          <Row>
            <Button
              onPress={() =>
                navigation.navigate("Details", { currentRun: selectedRunningId })
              }
              style={styles.startButton}
              mode="container"
            >
              {" "}
              <Text style={styles.startButtonText}>Show details</Text>
            </Button>
          </Row>
        </Grid>
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
  gridStyle: {
    margin: 0,
    padding: 0,

    justifyContent: "center",
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

  paddingMarginZero: {
    margin: 0,
    padding: 0,
  },
  startButton: {
    marginBottom: 10,
    marginTop: 50,
    backgroundColor: "#56CCf2",
    borderWidth: 5,
    borderColor: "#56CCf2",
    borderRadius: 20,
    padding: 10,
    width: "100%",
    justifyContent: "center",
  },
  primaryDataText: {
    padding: 30,
    color: "black",
    backgroundColor: "lightgray",
    textAlign: "center",
  },
  secondaryDataText: {
    padding: 30,
    color: "white",
    backgroundColor: "gray",
    textAlign: "center",
    fontWeight: "800",
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
  runnings: state.reducer.runnings,
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
    deleteRun: (runId) => dispatch({ type: "DELETE_RUN", payload: runId }),
    editRunName: (runId) => dispatch({ type: "EDIT_RUN", payload: runId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
