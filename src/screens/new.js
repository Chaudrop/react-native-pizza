import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import Picker from '../components/picker';
import { Chicken, Kebab, Margherita, Regina, FourCheese } from '../../assets/pizzas';

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
  },
  buttonContainer: {
    marginTop: 15,
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

function New() {
  const [flavor, setFlavor] = React.useState('Chicken');
  const [crust, setCrust] = React.useState('Normal');
  const [size, setSize] = React.useState('M');

  return (
    <View style={styles.container}>
      <Image source={pizzas[flavor]} style={styles.image} />
      <Picker label="Select Flavor" value={flavor} onChange={setFlavor} items={flavors} />
      <Picker label="Select Crust" value={crust} onChange={setCrust} items={crusts} />
      <Picker label="Select Size" value={size} onChange={setSize} items={sizes} />
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>SEND ORDER</Text>
      </TouchableOpacity>
    </View>
  );
}

export default New;
