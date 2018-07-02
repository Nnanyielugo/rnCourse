import React, { Component } from 'react';
import { 
  View, 
  Image, 
  Text, 
  Button, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  Dimensions 
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';

import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewMode: "portrait"
    }
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles)
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    })
  }

  placeDeletedHandler = () => {
    const { navigator, selectedPlace } = this.props;
    this.props.onDeletePlace(selectedPlace.key);
    navigator.pop()
  }
  render() {
    const { onItemDeleted, selectedPlace} = this.props;  
    return (
      <View style={styles.container}>
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image source={selectedPlace.image} style={styles.placeImage}/>
          </View>
          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta:
                  Dimensions.get("window").width /
                  Dimensions.get("window").height *
                  0.0122
              }}
              style={styles.map}
            >
              <MapView.Marker coordinate={this.props.selectedPlace.location} />
            </MapView>
          </View>
          <View style={styles.subContainer}>
            <View>
              <Text style={styles.placeName}>{selectedPlace.name}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon 
                  size={30} 
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"} 
                  color="red" 
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1
  },
  portraitContainer: {
    flexDirection: "column"
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  placeDetailContainer: {
    flex: 2
  },
  placeImage: {
    width: "100%",
    height: "100%"
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  deleteButton: {
    alignItems: 'center'
  },
  subContainer: {
    flex: 1
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  }
}

export default connect(null, mapDispatchToProps)(PlaceDetail);
