import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./components/HomeScreen";
import ListScreen from "./components/ListScreen";
import ActionScreen from "./components/ActionScreen"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigation from "./AppNavigation"
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <AppNavigation />
        </PaperProvider>
      </PersistGate>
    </Provider>
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
