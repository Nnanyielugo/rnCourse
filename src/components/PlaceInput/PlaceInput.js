import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const PlaceInput = props => {
  const { placeName, onChangeText } = props;
  return (
    <DefaultInput 
      placeholder="Place Name" 
      value={placeName} 
      onChangeText={onChangeText} />

  );
};

export default PlaceInput;
