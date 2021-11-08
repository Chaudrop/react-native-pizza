import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, Text, View } from 'react-native';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Chicken, Kebab, Margherita, Regina, FourCheese } from '../../assets/pizzas';

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardImage: {
    width: '50%',
    height: 150,
    resizeMode: 'contain',
  },
  infoContainer: {
    padding: 10,
    justifyContent: 'space-evenly',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

const pizzas = {
  Chicken,
  Kebab,
  Margherita,
  Regina,
  'Four Cheese': FourCheese,
};

function Card(props) {
  const { flavor, crust, size, distance } = props;

  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={pizzas[flavor]} />
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <FontAwesome5 style={styles.icon} name="pizza-slice" color="#e63022" size={16} />
          <Text style={styles.text}>{flavor}</Text>
        </View>
        <View style={styles.textContainer}>
          <MaterialCommunityIcons style={styles.icon} name="layers" color="#e63022" size={16} />
          <Text style={styles.text}>{crust}</Text>
        </View>
        <View style={styles.textContainer}>
          <Ionicons style={styles.icon} name="md-resize" color="#e63022" size={16} />
          <Text style={styles.text}>{size}</Text>
        </View>
        <View style={styles.textContainer}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="map-marker-distance"
            color="#e63022"
            size={16}
          />
          <Text style={styles.text}>{distance}</Text>
        </View>
      </View>
    </View>
  );
}

Card.propTypes = {
  flavor: PropTypes.string.isRequired,
  crust: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
};

export default Card;
