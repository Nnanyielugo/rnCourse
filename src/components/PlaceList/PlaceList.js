import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import ListItem from '../ListItem/ListItem';

const PlaceList = (props) => {
  const { places, onItemSelected } = props;
  
  return (
    <FlatList 
      style={styles.listContainer} 
      data={places}
      renderItem={(info) => (
        <ListItem 
          key={info.item.key} 
          placeName={info.item.name}
          placeImage={info.item.image}
          onPress={() => onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    padding: 10
  }
});

export default PlaceList;
