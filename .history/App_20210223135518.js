import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./components/HomeScreen";
import ListScreen from "./components/ListScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="home" activeColor="#e91e63">
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
              <MaterialCommunityIcons name="account-details
              " color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
