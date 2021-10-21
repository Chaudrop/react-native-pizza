import React from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

function Map() {
  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return setLocation(false);
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      return setLocation(currentLocation);
    })();
  }, []);

  let locationToDisplay;
  if (location === null) {
    locationToDisplay = 'loading...';
  } else if (location === false) {
    locationToDisplay = 'unauthorized';
  } else {
    locationToDisplay = JSON.stringify(location);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Here there will be a map to order pizzas near your location</Text>
      <Text>Your current location: {locationToDisplay}</Text>
    </View>
  );
}

export default Map;
