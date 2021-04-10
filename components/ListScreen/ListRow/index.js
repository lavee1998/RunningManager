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
import Dialog from "react-native-dialog";

const ListRow = ({ run, i, deleteRunning, updateRunning }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [isDeleteDialogVisible, SetIsDeleteDialogVisible] = React.useState(false);
  const [isNameChangeDialogVisible, SetIsNameChangeDialogVisible] = React.useState(false);
  const [newName, setNewName] = React.useState(null);

  const handlePress = () => setExpanded(!expanded);

  const onDeleteDialog = () => {
    SetIsDeleteDialogVisible(true);
  }

  const onCancelDeleteDialog = () => {
    SetIsDeleteDialogVisible(false);
  }

  const onDelete = () => {
    deleteRunning(run.id);
    SetIsDeleteDialogVisible(false);
  }

  const onChangeNameDialog = () => {
    SetIsNameChangeDialogVisible(true);
  }

  const onCancelNameDialog = () => {
    SetIsNameChangeDialogVisible(false);
  }

  const onSave = () => {
    SetIsNameChangeDialogVisible(false);
    updateRunning(run.id, newName);
  }

  return (
    <View>
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
        <List.Item title="Rename running" onPress={onChangeNameDialog} left={props => <List.Icon {...props} icon="rename-box" />}/>
        <List.Item title="Delete running" onPress={onDeleteDialog} left={props => <List.Icon {...props} icon="delete" />} />
        <List.Item title="View details" left={props => <List.Icon {...props} icon="equal" />}/>
      </List.Accordion>

      <Dialog.Container visible={isDeleteDialogVisible}>
        <Dialog.Title>Running deletion</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this running? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={onCancelDeleteDialog}/>
        <Dialog.Button label="Delete" onPress={onDelete}/>
      </Dialog.Container>

      <Dialog.Container visible={isNameChangeDialogVisible}>
        <Dialog.Title>Rename running</Dialog.Title>
        <Dialog.Input
              label="Name"
              defaultValue={run.name}
              onChangeText={(name) => setNewName(name)}
        ></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={onCancelNameDialog} />
        <Dialog.Button label="Save" onPress={onSave} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  gridStyle: {
    margin: 0,
    padding: 0,
    justifyContent: "center",
    width: "100%"
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

    updateRunning: (runningId, runningName) =>
    dispatch({
      type: "UPDATE_RUNNING",
      payload: {
        id: runningId,
        name: runningName
      },
    }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListRow);
