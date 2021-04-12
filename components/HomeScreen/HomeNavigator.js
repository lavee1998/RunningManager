import HomeScreen from "./HomeScreen";
import ActionScreen from "../ActionScreen";
import CountDownScreen from "../CountDownScreen";
import DetailsScreen from "../DetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator();
const HomeNavigator = ({navigation: tabNavigation}) => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Action" component={ActionScreen} />
      <Stack.Screen name="CountDown" component={CountDownScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} initialParams={tabNavigation} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
