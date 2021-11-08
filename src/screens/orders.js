import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import * as Location from 'expo-location';
import Card from '../components/Card';

const testData = [
  {
    flavor: 'Chicken',
    crust: 'Normal',
    size: 'M',
    distance: '12.6km',
  },
  {
    flavor: 'Four Cheese',
    crust: 'Thin',
    size: 'L',
    distance: '3km',
  },
  {
    flavor: 'Kebab',
    crust: 'Large',
    size: 'XL',
    distance: '0.6km',
  },
  {
    flavor: 'Kebab',
    crust: 'Large',
    size: 'XL',
    distance: '0.6km',
  },

  {
    flavor: 'Kebab',
    crust: 'Large',
    size: 'XL',
    distance: '0.6km',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    marginTop: 20,
    width: '90%',
  },
});

function Orders() {
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
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={testData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card flavor={item.flavor} crust={item.crust} size={item.size} distance={item.distance} />
        )}
      />
      <Text style={{ display: 'none' }}>Your current location: {locationToDisplay}</Text>
    </View>
  );
}

export default Orders;
