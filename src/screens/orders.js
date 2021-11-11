import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import * as Location from 'expo-location';
import Toast from 'react-native-root-toast';
import Card from '../components/Card';
import firebase from '../firebase/config';
import AuthContext from '../context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    marginTop: 20,
    width: '90%',
  },
  empty: {
    margin: 20,
    fontSize: 16,
  },
});

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function Orders(props) {
  const { navigation } = props;
  const context = React.useContext(AuthContext);
  const [location, setLocation] = React.useState(null);
  const [orders, setOrders] = React.useState(null);
  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        if (!mounted.current) return null;
        return setLocation(false);
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      if (mounted.current) return setLocation(currentLocation);
      return null;
    };
    getLocation();
    navigation.addListener('focus', () => {
      const entityRef = firebase.firestore().collection('orders');
      const userID = context.state.user.id;
      entityRef
        .where('authorID', '==', userID)
        .orderBy('createdAt', 'desc')
        .get()
        .then((querySnapshot) => {
          const newEntities = [];
          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          if (mounted.current) setOrders(newEntities);
        })
        .catch((error) => {
          Toast.show(error.message);
        });
    });
    return () => {
      mounted.current = false;
    };
  }, []);

  if (orders === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <Text style={styles.empty}>You didn&rsquo;t order any pizza yet</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={orders.map((o) => ({
            ...o,
            distance:
              location && o.location
                ? `${getDistanceFromLatLonInKm(
                    location.coords.latitude,
                    location.coords.longitude,
                    o.location.lat,
                    o.location.lng,
                  )
                    .toFixed(1)
                    .toString()} km`
                : 'Distance unavailable',
          }))}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card
              flavor={item.flavor}
              crust={item.crust}
              size={item.size}
              distance={item.distance}
            />
          )}
        />
      )}
    </View>
  );
}

Orders.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

export default Orders;
