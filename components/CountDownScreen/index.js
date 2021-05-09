import React from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { View, StyleSheet, Animated } from "react-native";
import { connect } from "react-redux";

// This component is the Counter component. On the screen a CountdownCircle will be visible for the user.
// navigation   -- navigation
// setStartDate -- store the startDate of the Running
const CountDownScreen = ({navigation, setStartDate}) => {

  //Handler when the CountDown finished
  const countDownFinished = () => {
    let today = new Date();
    setStartDate(today)
    navigation.navigate("Action")
  }

  return(
      <View style={styles.countDownContainer}>
      <CountdownCircleTimer
        isPlaying
        duration={2}
        onComplete={() => countDownFinished()}
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

  const mapStateToProps = (state /*, ownProps*/) => ({
    // interval: state.reducer.interval,
  });

  const mapDispatchToProps = (dispatch) => {
    return {
      // dispatching plain actions  
      setStartDate: (date) =>
        dispatch({
          type: "SET_START_DATE",
          payload: date,
        })
    };
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(CountDownScreen);