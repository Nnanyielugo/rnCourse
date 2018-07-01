import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import MainText from '../../components/UI/Text/MainText';
import HeadingText from '../../components/UI/Text/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

class SharePlace extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }
  
  constructor(props) {
    // execute the parent constructor
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    this.state = {
      placeName: ''
    }
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  }

  placeChangedHandler = prop => {
    this.setState({
      placeName: prop
    })
  }
  
  placeAddedHandler = () => {
    const { placeName } = this.state;
    if (placeName.trim() !== "") {
      this.props.onAddPlace(placeName);
      this.setState({
        placeName: ""
      })
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput 
            placeName={this.state.placeName}
            onChangeText={this.placeChangedHandler}
          />
          <View style={styles.button}>
            <Button 
              title="Share the place!"
              onPress={this.placeAddedHandler} 
            />            
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeHolder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
}

export default connect(null, mapDispatchToProps)(SharePlace);
