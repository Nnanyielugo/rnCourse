import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ListItem = (props) => {
  const { placeName, placeImage, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.listItem}>
        <Image resizeMode="contain" source={placeImage} style={styles.placeImage} />
        <Text>
          {placeName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    backgroundColor: '#EEE',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  placeImage: {
    marginRight: 8,
    height: 30,
    width: 30
  }
});

export default ListItem;
