import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlace from './src/screens/SharePlace/SharePlace';
import FindPlace from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

import configureStore from './src/store/configureSTore';

const store = configureStore();

// Register Screens
// registerComponent takes at least two arguments:
// Unique identifier, and a function which returns the screen.
// add store as third argument, and provider as fourth argument
Navigation.registerComponent(
  "awesome-places.AuthScreen", 
  () => AuthScreen, 
  store, 
  Provider
);
Navigation.registerComponent(
  "awesome-places.SharePlaceScreen", 
  () => SharePlace, 
  store, 
  Provider
);
Navigation.registerComponent(
  "awesome-places.FindPlaceScreen", 
  () => FindPlace, 
  store, 
  Provider
);
Navigation.registerComponent(
  "awesome-places.PlaceDetailScreen", 
  () => PlaceDetailScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "awesome-places.SideDrawer", 
  () => SideDrawer,
  store,
  Provider
);

// Start an App
// make the login screen available to be called on logout by exporting it as a function
 export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
})