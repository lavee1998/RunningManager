import { ScrollView, View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { Component, useEffect } from "react";
import { Card, Title, Button, TextInput } from "react-native-paper";
import { Col, Row, Grid } from "react-native-paper-grid";
import ListRow from "./ListRow"
import { List } from 'react-native-paper';

import { connect } from "react-redux";

// This component is the main component. Here the user can configure his/her running parameters
// navigation -- ??
const ListScreen = ({ navigation, runnings , removeRun, }) => {

  return (
    <ScrollView>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Your runs</Text>
      </View>

      <SafeAreaView style={styles.containerStyle}>
        {runnings.length > 0 &&
          <List.Section title="Runnings List">
          {runnings.length && runnings.map((run, i) => {
            return(
             <ListRow navigation={navigation} run={run} i={i} /> 
          )})}
          </List.Section>
        }
        {runnings.length == 0 &&
          <Text style={styles.noRunningsTextStyle}>No runnings to display</Text>
        }
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
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

  noRunningsTextStyle: {
    fontSize: 20,
    textAlign:"center"
  },

  pageTitle: {
    alignSelf: "stretch",
    textAlign: "center",
    color: "white",
    fontSize: 22,
    padding: 20,
    fontWeight: "900",
  },

  paddingMarginZero: {
    margin: 0,
    padding: 0,
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
  }
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
