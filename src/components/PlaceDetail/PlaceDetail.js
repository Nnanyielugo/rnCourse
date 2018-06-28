import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetail = props => {
  const { selectedPlace, onItemDeleted, onModalClose } = props;
  let modalContent = null;
  if (selectedPlace) {
    modalContent = (
      <View>
        <Image source={selectedPlace.image} style={styles.placeImage}/>
        <Text style={styles.placeName}>{selectedPlace.name}</Text>
      </View>
    )
  }
  return (
    <Modal onRequestClose={onModalClose} visible={selectedPlace !== null} animationType="slide">
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <TouchableOpacity onPress={onItemDeleted}>
            <View style={styles.deleteButton}>
              <Icon size={30} name="ios-trash" color="red" />
            </View>
          </TouchableOpacity>
          <Button title="Close" onPress={onModalClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center'
  }
});

export default PlaceDetail;
