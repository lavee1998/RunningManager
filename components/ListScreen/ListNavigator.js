import ListScreen from "./ListScreen";
import DataGrid from "../DataGrid";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";


const Stack = createStackNavigator();
const ListNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen  name="List" component={ ListScreen } />
      <Stack.Screen name="DataGrid" component={ DataGrid } />
      {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
    </Stack.Navigator>
  );
};

export default ListNavigator;
