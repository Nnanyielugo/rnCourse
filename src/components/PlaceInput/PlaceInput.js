import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const PlaceInput = (props) => {
  const { value, onChangeText, onPress } = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.placeInput}
        placeholder="Enter a name"
        value={value}
        onChangeText={onChangeText}
      />
      <Button 
        title="Add"
        style={styles.placeButton}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  },
});

export default PlaceInput;
