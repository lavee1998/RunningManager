import { ScrollView, View, Image, Text } from "react-native";
import React, { Component, useEffect } from "react";
import { Card, Title, Button, TextInput } from "react-native-paper";
import TimePicker from 'react-time-picker';

import { connect, useDispatch } from "react-redux";
import DropDown from "react-native-paper-dropdown";


const HomeScreen = () => {
  const [showDropDown, setShowDropDown] = React.useState(false)
  const [interval, setInterval] = useState("")
  const [value, onChange] = useState('10:00');



  const [runType, setRunType] = React.useState(-1);

  const runTypeList = [
    { value: 0, label: "Run based on time and distance" },
    { value: 1, label: "Run based on time" },
    { value: 2, label: "Run based on distance" },
    { value: 3, label: "Free run"}
  ];

  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Please set your details</Text>
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
        <Text>Home!</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
