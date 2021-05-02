import React from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { View, StyleSheet, Animated } from "react-native";

// This component is the Counter component. On the screen a CountdownCircle will be visible for the user.
// navigation  -- navigation
const CountDownScreen = ({navigation}) => {
  return(
      <View style={styles.countDownContainer}>
      <CountdownCircleTimer
        isPlaying
        duration={2}
        onComplete={() => navigation.navigate("Action")}
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
  )
}


const styles = StyleSheet.create({
    countDownContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 8,
    },
  });

export default CountDownScreen