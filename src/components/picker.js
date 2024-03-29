import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { Picker as ReactNativePicker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    margin: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    width: '80%',
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderColor: 'grey',
    width: '80%',
  },
  picker: {
    padding: 5,
    width: '100%',
  },
  pickerItem: {
    height: 50,
  },
});

function Picker(props) {
  const { label, value, onChange, items } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <ReactNativePicker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {items.map((item) => (
            <ReactNativePicker.Item key={item} label={item} value={item} />
          ))}
        </ReactNativePicker>
      </View>
    </View>
  );
}

Picker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Picker;
