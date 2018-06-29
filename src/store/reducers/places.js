import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';
import PlaceImage from '../../assets/lion.jpg';

const initialState = {
  places: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
    return {
      ...state,
      places: state.places.concat({
        key: Math.random(),
        name: action.payload,
        image: PlaceImage
      })
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