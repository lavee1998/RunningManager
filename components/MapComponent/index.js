import MapView, { Marker, AnimatedRegion, Polyline } from "react-native-maps";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

// This component is responsible for the Map
// It will be integrated into different screens
// running      -- passed by the components for displaying the markers on the map
const MapComponent = ({ running, detailsView }) => {
  // console.log("running-test",running)
  if (running.length) {
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
                    title={"Aktuális adatok"}
                    description={`Sebesség: ${corr.speed} `}
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
    height: Dimensions.get("window").height * 0.7,
  },
});

export default MapComponent;
