import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import Picker from '../components/picker';
import { Chicken, Kebab, Margherita, Regina, FourCheese } from '../../assets/pizzas';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 15,
    width: 150,
  },
  image: {
    flex: 1,
    width: '75%',
    maxHeight: '40%',
    resizeMode: 'contain',
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
      <View style={styles.button}>
        <Button color="red" title="Send order" onPress={() => {}} />
      </View>
    </View>
  );
}

export default New;
