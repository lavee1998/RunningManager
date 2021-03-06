import {
  ScrollView,
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet, Animated,
} from "react-native";
import React from "react";
import Constants from 'expo-constants';

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


const ActionScreen = () => {

    const [isCompleted, setCompleted] = React.useState(true)

    const isCompleted = () => {
        console.log ( "végeztem" )
        setCompleted(false)
        return [false, 0]
    }

    
  return (
    <View style={styles.container}>
      <Text> "Hello from actionScreen" </Text>

      <CountdownCircleTimer
        isPlaying
        duration={5}
        style={isCompleted?styles.show:}
        onComplete={() => isCompleted()}
        colors={[
          ["#004777", 0.4],
          ["#F7B801", 0.4],
          ["#A30000", 0.2],
        ]}
      >
        {({ remainingTime, animatedColor }) => (
          <Animated.Text style={{ color: animatedColor }}>
            {remainingTime}
          </Animated.Text>
        )}
      </CountdownCircleTimer>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    remainingTime: {
      fontSize: 48,
    },
  });


export default ActionScreen;
