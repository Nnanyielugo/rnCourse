import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const PlaceList = (props) => {
  const { places, onItemDeleted } = props;
  const placesOutput = places.map((place, i) => (
    <ListItem 
      key={i} 
      placeName={place}
      onPress={() => onItemDeleted(i)}
    />
   ))
  return (
    <View style={styles.listContainer}>
      {placesOutput}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    padding: 10
  }
});

export default PlaceList;
