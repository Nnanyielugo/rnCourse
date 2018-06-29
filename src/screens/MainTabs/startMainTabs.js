import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';



// place the navigation inside a function body and export it
const startTabs = () => {
  // Use a promise to fetch the Icons from the async getImageSource function,
  // then wrap the startTabBasedApp method in its `then` block to ensure that,
  // the icons are only requested when the promise resolves
  Promise.all([
    Icon.getImageSource("md-map", 30),
    Icon.getImageSource("ios-share-alt", 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "awesome-places.FindPlaceScreen",
          label: "Find Place",
          title: 'FInd Place',
          icon: sources[0]
        },
        {
          screen: "awesome-places.SharePlaceScreen",
          label: "Share Place",
          title: 'Share Place',
          icon: sources[1]
        }
      ]
    });
  })
  
  
}

export default startTabs;