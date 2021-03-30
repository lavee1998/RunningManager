import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import DataGrid from "../DataGrid";
import ActionScreen from "./ActionScreen";


const Stack = createStackNavigator();
const ActionNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen name="Action" component={ ActionScreen } />
      <Stack.Screen name="DataGrid" component={ DataGrid } />
    </Stack.Navigator>
  );
};

export default ActionNavigator;