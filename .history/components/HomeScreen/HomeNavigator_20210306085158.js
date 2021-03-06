import HomeScreen from "./HomeScreen";
import ActionScreen from "../ActionScreen";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";


const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen headerMode="none" name="Home" component={ HomeScreen } />
      <Stack.Screen name="Action" component={ ActionScreen } />
      {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
