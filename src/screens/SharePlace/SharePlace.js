import React, { Component } from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Image,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import MainText from '../../components/UI/Text/MainText';
import HeadingText from '../../components/UI/Text/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';

class SharePlace extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }
  
  constructor(props) {
    // execute the parent constructor
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    this.state = {
      controls: {
        placeName: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          },
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      }
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
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: prop,
            valid: validate(prop, prevState.controls.placeName.validationRules)
          }
        }
      }
    })
  }

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      }
    })
  }

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      }
    })
  }
  
  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value, 
      this.state.controls.location.value,
      this.state.controls.image.value
    );
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: ''
          }
        }
      }
    })    
  }

  render() {
    let submitButton = (
      <Button 
        title="Share the place!"
        onPress={this.placeAddedHandler}
        disabled={
          !this.state.controls.placeName.valid || 
          !this.state.controls.location.valid ||
          !this.state.controls.image.valid
        }
      /> 
    )
    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <PickImage onImagePicked={this.imagePickedHandler} />
          <PickLocation onLocationPick={this.locationPickedHandler}  />
          <PlaceInput 
            placeName={this.state.controls.placeName.value}
            onChangeText={this.placeChangedHandler}
          />
          <View style={styles.button}>
            {submitButton}           
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

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlace);
