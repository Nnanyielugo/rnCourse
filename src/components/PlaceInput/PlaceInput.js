import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

class PlaceInput extends Component {
  state = {
    placeName: ''
  }

  handlePlacesChange = prop => {
    this.setState({
      placeName: prop
    })
  }

  handlePlaceSubmit = () => {
    const { placeName } = this.state;
    if (placeName.trim() === '') return;
    this.props.onPlaceAdded(placeName);
    this.setState({
      placeName: ''
    })
  }

  render() {
    const { placeName } = this.state;
    return (
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.placeInput}
          placeholder="Enter a name"
          value={placeName}
          onChangeText={this.handlePlacesChange}
        />
        <Button 
          title="Add"
          style={styles.placeButton}
          onPress={this.handlePlaceSubmit}
        />
      </View>
    );
  }
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
