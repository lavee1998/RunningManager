import MapView, { Marker, AnimatedRegion, Polyline } from "react-native-maps";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

// This component is responsible for the Map
// It will be integrated into different screens
// running      -- passed by the components for displaying the markers on the map
// detailsView  -- when it is used for the detailView
const MapComponent = ({ running, detailsView }) => {
 
  if (running.length) {
     running = running.filter(function(value, index, Arr) {
      return index % 4 == 0;
  });

  return (
      <View>
        <MapView
          showsUserLocation={!!!detailsView}
          loadingEnabled
          style={styles.map}
          region={{
            latitude: running[running.length - 1].latitude,
            longitude: running[running.length - 1].longitude,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
          }}
          initialRegion={{
            latitude: running[running.length - 1].latitude,
            longitude: running[running.length - 1].longitude,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
          }}
        >
          {detailsView && (
            <>
              <Polyline coordinates={running} strokeWidth={5} />
              {running.map((corr) => {
                return (
                  <Marker
                    coordinate={{
                      latitude:
                        corr.latitude,
                      longitude:
                        corr.longitude,
                    }}
                    title={"Actual data"}
                    description={`Speed: ${corr.speed} `}
                  />
                );
              })}
            </>
          )}
        </MapView>
      </View>
    );
  }

  return (
    <View>
      <MapView
        showUserLocation
        followUserLocation
        loadingEnabled
        style={styles.map}
      >
        <Polyline coordinates={running} strokeWidth={5} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get("window").height * 0.5,
  },
});

export default MapComponent;
