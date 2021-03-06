import {
    ScrollView,
    View,
    Image,
    Text,
    SafeAreaView,
    TouchableHighlight,
    StyleSheet,
  } from "react-native";
  import React from "react";


const ActionScreen = () => {

    return (<View><Text> "Hello from actionScreen" </Text>
    
    <CountdownCircleTimer
    isPlaying
    duration={10}
    colors={[
      ['#004777', 0.4],
      ['#F7B801', 0.4],
      ['#A30000', 0.2],
    ]}
  >
    {({ remainingTime, animatedColor }) => (
      <Animated.Text style={{ color: animatedColor }}>
        {remainingTime}
      </Animated.Text>
    )}
  </CountdownCircleTimer>
  
  </View>)
}

export default ActionScreen