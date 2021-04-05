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

const ListRow = ({ run, i }) => {
  const [expanded, setExpanded] = React.useState(false);

  console.log(run, i , "test2")
  const handlePress = () => setExpanded(!expanded);

  return (
      <List.Accordion
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
                {Moment(run.startDate).format('Do MMM YYYY')}
              </Text>
            </Col>
          </Text>
        }
        expanded={expanded}
        onPress={handlePress}
      >
        <List.Item title="First" />
        <List.Item title="Second item" />
      </List.Accordion>
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
export default ListRow;
