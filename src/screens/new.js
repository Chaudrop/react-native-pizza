import React from 'react';
import { Keyboard, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import Toast from 'react-native-root-toast';
import * as Location from 'expo-location';
import Picker from '../components/picker';
import { Chicken, Kebab, Margherita, Regina, FourCheese } from '../../assets/pizzas';
import firebase from '../firebase/config';
import AuthContext from '../context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '75%',
    maxHeight: '40%',
    resizeMode: 'contain',
    marginTop: 15,
  },
  buttonContainer: {
    marginVertical: 15,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    borderRadius: 20,
    backgroundColor: '#e63022',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

const pizzas = {
  Chicken,
  Kebab,
  Margherita,
  Regina,
  'Four Cheese': FourCheese,
};
const flavors = Object.keys(pizzas);
const crusts = ['Thin', 'Normal', 'Large'];
const sizes = ['S', 'M', 'L', 'XL'];

function getRandomOffset() {
  return Math.round(Math.random() * 100) / 1000;
}

function New() {
  const context = React.useContext(AuthContext);
  const [flavor, setFlavor] = React.useState('Chicken');
  const [crust, setCrust] = React.useState('Normal');
  const [size, setSize] = React.useState('M');
  const [location, setLocation] = React.useState(null);
  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        if (!mounted.current) return null;
        return setLocation(false);
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      if (mounted.current) return setLocation(currentLocation);
      return null;
    })();
    return () => {
      mounted.current = false;
    };
  }, []);

  const createOrder = () => {
    const collectionRef = firebase.firestore().collection('orders');
    const data = {
      flavor,
      crust,
      size,
      authorID: context.state.user.id,
      createdAt: Date.now(),
      location: location
        ? {
            lat: location.coords.latitude + getRandomOffset(),
            lng: location.coords.longitude + getRandomOffset(),
          }
        : null,
    };
    collectionRef
      .add(data)
      .then(() => {
        Keyboard.dismiss();
        Toast.show('Order successfully created');
      })
      .catch((error) => {
        Toast.show(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={pizzas[flavor]} style={styles.image} />
      <Picker label="Select Flavor" value={flavor} onChange={setFlavor} items={flavors} />
      <Picker label="Select Crust" value={crust} onChange={setCrust} items={crusts} />
      <Picker label="Select Size" value={size} onChange={setSize} items={sizes} />
      <TouchableOpacity style={styles.buttonContainer} onPress={createOrder}>
        <Text style={styles.buttonText}>SEND ORDER</Text>
      </TouchableOpacity>
    </View>
  );
}

export default New;
