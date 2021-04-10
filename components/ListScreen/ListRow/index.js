import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { Component, useEffect } from "react";
import { Card, Title, Button, TextInput } from "react-native-paper";
import { Col, Row, Grid } from "react-native-paper-grid";
import { connect } from "react-redux";
import { List } from 'react-native-paper';
import Moment from 'moment';

const ListRow = ({ run, i, deleteRunning }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);
  const onDelete = () => {
    deleteRunning(run.id);
  }

  return (
      <List.Accordion
        style = {styles.gridStyle}
        title={
          <Text>
            {" "}
            <Col>
              <Text
                style={
                  i % 2 == 0 ? styles.primaryDataText : styles.secondaryDataText
                }
              >
                {run.name}
              </Text>
            </Col>
            <Col>
              <Text
                style={
                  i % 2 == 0 ? styles.primaryDataText : styles.secondaryDataText
                }
              >
                {Moment(run.startDate).format('llll')}
              </Text>
            </Col>
          </Text>
        }
        expanded={expanded}
        onPress={handlePress}
      >
        <List.Item title="Rename running" left={props => <List.Icon {...props} icon="rename-box" />}/>
        <List.Item title="Delete running" onPress={onDelete} left={props => <List.Icon {...props} icon="delete" />} />
        <List.Item title="View details" left={props => <List.Icon {...props} icon="equal" />}/>
      </List.Accordion>
  );
};

const styles = StyleSheet.create({
  gridStyle: {
    margin: 0,
    padding: 0,
    justifyContent: "center",
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
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRunning: (runningId) =>
      dispatch({
        type: "REMOVE_RUNNING",
        payload: {
          id: runningId
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListRow);
