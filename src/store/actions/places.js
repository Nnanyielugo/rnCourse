import { ADD_PLACE, DELETE_PLACE, SET_PLACES } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading())
    fetch("https://us-central1-awesome-places-36e84.cloudfunctions.net/storeImage", {
      method: "POST",
      body: JSON.stringify({
        image: image.base64
      })
    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong, please try again")
      dispatch(uiStopLoading())
    })
    .then(res => res.json())
    .then(parsedResponse => {
      const placeData = {
        name: placeName,
        location: location,
        image: parsedResponse.imageUrl
      };
      return fetch("https://awesome-places-36e84.firebaseio.com/places.json", {
        method: "POST",
        body: JSON.stringify(placeData)
      })
    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong, please try again")
      dispatch(uiStopLoadin())
    })
    .then(res  => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
      dispatch(uiStopLoading())
    })
  }
}

export const getPlaces = () => {
  return dispatch => {
    fetch("https://awesome-places-36e84.firebaseio.com/places.json")
    .catch(err => {
      alert("Something went wrong, sorry :/");
      console.log(err);
    })
    .then(res => res.json())
    .then(parsedResponse => {
      const places = [];
      for (let key in parsedResponse) {
        places.push({
          ...parsedResponse[key],
          image: {
            uri: parsedResponse[key].image
          },
          key: key
        })
      }
      dispatch(setPlaces(places))
    })
  }
}

export const setPlaces =places => {
  return {
    type: SET_PLACES,
    payload: places
  }
}

export const deletePlace = key => {
  // return {
  //   type: DELETE_PLACE,
  //   payload: key
  // }
}   