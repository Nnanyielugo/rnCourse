import { SET_PLACES, DELETE_PLACE } from '../actions/actionTypes';
import PlaceImage from '../../assets/lion.jpg';

const initialState = {
  places: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: action.payload
      }
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.payload;
        })
      }
    default:
      return state;
  }
}

export default reducer;