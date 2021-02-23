import { ScrollView, View, Image, Text } from "react-native";
import React, { Component, useEffect } from "react";
import { Button } from "react-native-paper";
import { connect, useDispatch } from "react-redux";
import DropDown from "react-native-paper-dropdown";



const HomeScreen = () => {

    const actionList = [
        { value: 0, label: 'Traffipax' },
        { value: 1, label: 'Accident'  },
        { value: 2, label: 'Construction' },
      ]
  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
