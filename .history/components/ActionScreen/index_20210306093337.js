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

    const [isCompleted, setCompleted] = React.useState(false)

    const completeCountDown = () => {
        console.log ( "végeztem" )
        setCompleted(true)
        return [false, 0]
    }

    
  return (
    <View style={styles.container}>
      <Text> "Hello from actionScreen" </Text>

      {!isCompleted && <CountdownCircleTimer
        isPlaying
        duration={5}
        onComplete={() => completeCountDown()}
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
      </CountdownCircleTimer>}

      <TouchableHighlight onPress={() => toggleStopwatch()}>
            <Text style={{ fontSize: 30 }}>
              {stopwatchStart ? "Stop" : "Start"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => resetStopwatch()}>
            <Text style={{ fontSize: 30 }}>Reset</Text>
          </TouchableHighlight>
          <Stopwatch
            laps
            msecs
            start={stopwatchStart}
            reset={stopwatchReset}
            options={options}
            getTime={(time) => getFormattedTime(time)}
          />
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
