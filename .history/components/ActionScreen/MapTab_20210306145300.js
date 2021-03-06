export default MapTab = () => (
    <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
  );

  

const styles = StyleSheet.create({
    scene: {
      backgroundColor: "#ff4081",
      flex: 1,
    },
    countDownContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 8,
    },
    contentContainer: {
      padding: 8,
      marginHorizontal: 20,
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
  
      backgroundColor: "#ecf0f1",
      padding: 2,
    },
  
    textInput: {
      borderBottomWidth: 0.3,
      borderBottomColor: "black",
      height: 25,
      fontSize: 16,
      marginVertical: 50,
      marginHorizontal: 20,
    },
    remainingTime: {
      fontSize: 48,
    },
  
    stopButton: {
      marginBottom: 10,
      marginTop: 10,
      backgroundColor: "#56CCf2",
      borderWidth: 5,
      borderColor: "#56CCf2",
      borderRadius: 20,
      padding: 10,
    },
  
    stopButtonText: {
      color: "white",
      fontWeight: "900",
      fontSize: 20,
    },
  });