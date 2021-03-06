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

import { addPlace, stopRedirect } from '../../store/actions/index';
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
  }

  UNSAFE_componentWillMount() {
    this.reset()
  }

  reset = () => {
    this.setState({
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
    })
  } 

  componentDidUpdate() {
    if (this.props.redirect){
      this.props.navigator.switchToTab({tabIndex: 0});
      // moved method to findPlace to take advantage of 
      // navigator's lifecycle hooks
      // this.props.onStopRedirect();
    }
  }

  onNavigatorEvent = event => {
    // use navigator lifeCycle hooks
    if (event.type === "ScreenChangedEvent") {
      if(event.id === "willAppear") {
        this.props.onStopRedirect();
      }
    }
    // listen to sidebar toggle
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
    this.reset();
    // call the reset method in imagePicker using the reference created
    this.imagePicker.reset();
    this.locationPicker.reset()
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
          <PickImage 
            onImagePicked={this.imagePickedHandler}
            // create a reference to imagePicker
            ref={ref => this.imagePicker = ref}
          />
          <PickLocation 
            onLocationPick={this.locationPickedHandler}
            ref={ref => this.locationPicker = ref}
          />
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
    isLoading: state.ui.isLoading,
    redirect: state.places.redirect
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
    onStopRedirect: () => dispatch(stopRedirect())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlace);
