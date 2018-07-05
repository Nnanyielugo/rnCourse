import { SET_PLACES, DELETE_PLACE, REDIRECT_TO_FIND, STOP_REDIRECT } from '../actions/actionTypes';
import PlaceImage from '../../assets/lion.jpg';

const initialState = {
  places: [],
  redirect: false
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
    case REDIRECT_TO_FIND:
      return {
        ...state,
        redirect: true
      }
    case STOP_REDIRECT:
      return {
        ...state,
        redirect: false
      }
    default:
      return state;
  }
}

export default reducer;