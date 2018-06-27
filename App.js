import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import PlaceImage from './src/assets/lion.jpg'

export default class App extends React.Component {
  state = {
    placeName: '',
    places: [],
    selectedPlace: null
  }

  handlePlacesChange = prop => {
    this.setState({
      placeName: prop
    })
  }

  handlePlaceSelected = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
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
        places: prevState.places.concat({
          key: Math.random(),
          name: placeName,
          image: PlaceImage
          // if imageLink
          // image: {
          //   uri: 'imageLink'
          // }
        }),
        // placeName: ''
      }
    })
  }

  handlePlaceDelete = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      }
    })
  }

  handleModalClose = () => {
    this.setState({
      selectedPlace: null
    })
  }
  render() {
    const { places, placeName, selectedPlace } = this.state;
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={selectedPlace}
          onItemDeleted={this.handlePlaceDelete}
          onModalClose={this.handleModalClose}
        />
        <PlaceInput
          value={placeName}
          onChangeText={this.handlePlacesChange}
          onPress={this.handlePlaceSubmit}
        />
        <PlaceList 
          places={places}
          onPress={this.handleItemPress}
          onItemSelected={this.handlePlaceSelected}
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
