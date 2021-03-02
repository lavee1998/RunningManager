import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./components/HomeScreen";
import ListScreen from "./components/ListScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Provider as PaperProvider } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();


export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Tab.Navigator initialRouteName="home" activeColor="#ffffff">
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="action" component={actionScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Get started",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="run-fast" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="list"
          component={ListScreen}
          options={{
            tabBarLabel: "Your runs",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-details" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
