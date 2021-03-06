import HomeScreen from "./HomeScreen";
import ActionScreen from "../ActionScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="home" component={HomeScreen} />

      <Stack.Screen name="action" component={ActionScreen} />
      {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
