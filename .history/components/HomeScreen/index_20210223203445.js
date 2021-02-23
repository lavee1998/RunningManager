import { ScrollView, View, Image, Text } from "react-native";
import React, { Component, useEffect } from "react";
import { Card, Title, Button, TextInput } from "react-native-paper";

import { connect, useDispatch } from "react-redux";
import DropDown from "react-native-paper-dropdown";
import { TimePickerModal } from 'react-native-paper-dates'

const HomeScreen = () => {
  const [showDropDown, setShowDropDown] = React.useState(false);
  // const [interval, setInterval] = useState("");
  // const [value, onChange] = useState("00:00:00");

  
  const [open, setOpen] = React.useState(true);

  const [visible, setVisible] = React.useState(false)
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      console.log({ hours, minutes });
    },
    [setVisible]
  );



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
            <Button
              icon="camera"
              mode="contained"
              onPress={() => console.log("Pressed")}
            >
              Press me
            </Button>
            <Button onPress={() => setOpen(true)} uppercase={false} mode="contained">
        Pick single date
      </Button>
            <DatePickerModal
              // locale={'en'} optional, default: automatic
              mode="single"
              visible={open}
              onDismiss={onDismissSingle}
              date={date}
              onConfirm={onConfirmSingle}
              // onChange={} // same props as onConfirm but triggered without confirmed by user
              // saveLabel="Save" // optional
              // label="Select date" // optional
              // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
            />
            <Text>Home!</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
