import { ADD_PLACE, DELETE_PLACE, SET_PLACES, PLACE_ADDED, REDIRECT_TO_FIND, STOP_REDIRECT } from './actionTypes';
import { authGetToken, uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading())
    dispatch(authGetToken())
    .catch(() => {
      alert("No valid token found")
    })
    .then(token => {
      authToken = token
      return fetch("https://us-central1-awesome-places-36e84.cloudfunctions.net/storeImage", {
        method: "POST",
        body: JSON.stringify({
          image: image.base64
        }),
        headers: {
          "Authorization": "Bearer " + authToken
        }
      })
    })    
    .catch(err => {
      console.log(err);
      alert("Something went wrong, please try again")
      dispatch(uiStopLoading())
    })
    .then(res => {
      if (res.ok) {
        res.json();
      } else {
        throw(new Error());
      }
    })
    .then(parsedResponse => {
      const placeData = {
        name: placeName,
        location: location,
        image: parsedResponse.imageUrl,
        imagePath: parsedResponse.imagePath
      };
      return fetch("https://awesome-places-36e84.firebaseio.com/places.json?auth=" + authToken, {
        method: "POST",
        body: JSON.stringify(placeData)
      })
    })
    .then(res  => {
      if (res.ok) {
        res.json();
      } else {
        // forward to catch block
        throw(new Error());
      }
    })
    .then(parsedRes => {
      console.log(parsedRes);
      dispatch(uiStopLoading());
      dispatch(redirectToFind());
    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong, please try again")
      dispatch(uiStopLoading())
    });
  }
}

export const redirectToFind = () => {
  return {
    type: REDIRECT_TO_FIND
  }
}

export const stopRedirect = () => {
  return {
    type: STOP_REDIRECT
  }
}

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
    .then(token  => {
      return fetch("https://awesome-places-36e84.firebaseio.com/places.json?auth=" + token)
    })
    .catch(() => {
      alert("No valid token found")
    })
    .then(res => {
      if (res.ok) {
        res.json();
      } else {
        // forward to catch block
        throw(new Error());
      }
    })
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
    .catch(err => {
      alert("Something went wrong, sorry :/");
      console.log(err);
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
  return dispatch => {
    dispatch(authGetToken())
    .catch(() => {
      alert("No valid token found")
    })
    .then(token => {
      dispatch(removePlace(key))
      return fetch("https://awesome-places-36e84.firebaseio.com/places/" + key + ".json?auth=" + token, {
        method: "DELETE"
      })
    })
    .then(res => {
      if (res.ok) {
        res.json();
      } else {
        // forward to catch block
        throw(new Error());
      }
    })
    .then(parsedRes => {
      console.log("Done")
    })
    .catch(err => {
      alert("Something went wrong, sorry :/")
      console.log(err)
    })
  }
}   

export const removePlace = key => {
  return {
    type: DELETE_PLACE,
    payload: key
  }
}