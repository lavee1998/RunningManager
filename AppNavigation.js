import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./components/HomeScreen";
import ListScreen from "./components/ListScreen";
import ActionScreen from "./components/ActionScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { connect } from "react-redux";

const Tab = createMaterialBottomTabNavigator();

const AppNavigation = ({ isRunning }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="home" activeColor="#ffffff">
        <Tab.Screen
          name="home"
          component={HomeScreen}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              if (isRunning) e.preventDefault();
            },
          }}
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
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              if (isRunning) e.preventDefault();
            },
          }}
          options={{
            tabBarLabel: "Your runs",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-details"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state /*, ownProps*/) => ({
  isRunning: state.reducer.isRunning,
});

export default connect(mapStateToProps)(AppNavigation);
