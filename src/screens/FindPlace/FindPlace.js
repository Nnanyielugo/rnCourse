import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';
import { getPlaces } from '../../store/actions/index';

class FindPlace extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }

  constructor(props) {
    // execute the parent constructor
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    this.state = {
      placesLoaded: false,
      // add the argument to initialize the constructor with.
      // in this case, it's starting at scale 1, and at opacity 1
      placesAnim: new Animated.Value(0),
      removeAnim: new Animated.Value(1)
    }
  }

  componentDidMount() {
    this.props.onLoadPlaces();
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

  itemSelectedHandler = key => {
    const { navigator, places } = this.props;
    const selPlace = places.find(place => {
      return place.key === key;
    })
    navigator.push({
      screen: "awesome-places.PlaceDetailScreen",
      title: selPlace.name,
      passProps: {
        selectedPlace: selPlace
      }
    })
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
  };

  render() {
    const { places } = this.props;
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              // using just this.state.removeAnim would shrink the button, then make it transparent
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.placesLoaded === true) {
      content = (
        <PlaceList 
          places={places}
          onItemSelected={this.itemSelectedHandler}
        />
      )
    }
    return (
      <View style={this.state.placesLoaded === true ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 26
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPlace);
