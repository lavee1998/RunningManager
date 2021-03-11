
// This component is responsible for the Map
// It will be integrated into different screens
const MapComponent = () => {
    const [currentLocation, setCurrentLocation] = React.useState(null);

    return (
        <View>
            <MapView />
        </View>
    );
};