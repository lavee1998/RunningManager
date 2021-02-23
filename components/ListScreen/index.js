import { ScrollView, View, Image, Text } from "react-native";
import React, { Component, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

const ListScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>List view!</Text>
    </View>
  );
};

export default ListScreen;
