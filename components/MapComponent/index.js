import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
} from 'react-native-maps';
import React from "react";
import {
  View,
  StyleSheet,
  Dimensions
} from "react-native";

// This component is responsible for the Map
// It will be integrated into different screens
// runCoordinates      -- passed by the components for displaying the markers on the map
const MapComponent = ({ runCoordinates }) => {
  if (runCoordinates.length ){

  console.log(runCoordinates.length);
  console.log(runCoordinates[runCoordinates.length-1]);
    return (
    <View>
      <MapView initialRegion={{
      latitude: runCoordinates[runCoordinates.length-1].latitude ,
      longitude: runCoordinates[runCoordinates.length-1].longitude ,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
      loadingEnabled style={styles.map}>
        
        <Polyline coordinates={runCoordinates} strokeWidth={5} />
        
          <Marker
          coordinate={{latitude : runCoordinates[runCoordinates.length-1].latitude , longitude: runCoordinates[runCoordinates.length-1].longitude }}
          title={"hali"}
          description={"marker.description"}
        />
        

      </MapView>
    </View>
  );
  }

  return (<View>
    <MapView showUserLocation followUserLocation loadingEnabled style={styles.map}>

    <Polyline coordinates={runCoordinates} strokeWidth={5} />
       
      

    </MapView>
  </View>)
};

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get("window").height * 0.7,
  }
});

export default MapComponent;