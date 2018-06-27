import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';

export default class App extends React.Component {
  state = {
    placeName: '',
    places: []
  }

  handlePlacesChange = prop => {
    this.setState({
      placeName: prop
    })
  }

  handleItemDelete = index => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter((place, i) => {
          return i !== index;
        })
      }
    })
  }

  handleItemPress = () => {
    alert('Item pressed!')
  }

  handlePlaceSubmit = () => {
    const { placeName } = this.state;
    if (placeName.trim() === '') return;
    this.setState(prevState => {
      return {
        places: prevState.places.concat(prevState.placeName),
        placeName: ''
      }
    })
  }
  render() {
    const { places, placeName } = this.state;
    return (
      <View style={styles.container}>
        <PlaceInput
          value={placeName}
          onChangeText={this.handlePlacesChange}
          onPress={this.handlePlaceSubmit}
        />
        <PlaceList 
          places={places}
          onPress={this.handleItemPress}
          onItemDeleted={this.handleItemDelete}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
