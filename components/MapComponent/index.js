
// This component is responsible for the Map
// It will be integrated into different screens
// location     -- used by the ActionSreen for current position
// markers      -- passed by the components for displaying the markers on the map
export default  MapComponent = ({location,markers}) => {
    return (
        <View>
            <MapView style={styles.map}/>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
      height: Dimensions.get("window").height * 0.7,
    }
  });