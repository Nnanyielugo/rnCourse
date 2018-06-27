import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ListItem = (props) => {
  const { placeName, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.listItem}>
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
    marginBottom: 5
  },
});

export default ListItem;
