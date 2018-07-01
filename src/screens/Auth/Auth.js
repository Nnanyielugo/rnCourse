import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/Text/HeadingText';
import MainText from '../../components/UI/Text/MainText';
import BackgroundImage from '../../assets/background.jpg'
import ButtonWithBackground from '../../components/UI/Button/ButtoinWIthBackground';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    }
    Dimensions.addEventListener("change", this.updateStyles)
  }
  loginHandler = () => {
    startMainTabs()
  }

  componentWillUnmount(){
    // remove dimensions eventHandler to prevent memory leak
    Dimensions.removeEventListener("change", this.updateStyles)
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    })
  }

  render() {
    let headingText = null;
    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText>Please Login</HeadingText>
        </MainText>
      )
    }
    return (
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground 
            color="#29aaf4" 
            onPress={() => alert("Pressed button")}>Switch to Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput placeholder="Your E-mail Address" style={styles.input} />
            <View 
              style={
                this.state.viewMode === "portrait" 
                  ? styles.portraitPasswordContainer 
                  : styles.landscapePasswordContainer
                }
              >
              <View 
                style={
                  this.state.viewMode === "portrait" 
                    ? styles.portraitPasswordWrapper 
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput placeholder="Password" style={styles.input} />
              </View>
              <View 
                style={
                  this.state.viewMode === "portrait" 
                    ? styles.portraitPasswordWrapper 
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput placeholder="Confirm Password" style={styles.input} /> 
              </View>            
            </View>
          </View>
          <ButtonWithBackground 
            color="#29aaf4" 
            onPress={this.loginHandler}>Submit</ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position items on the main axis (top to bottom)
    justifyContent: 'center',
    // position items on the cross-axis (left to right)
    alignItems: 'center'
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection:"column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  }
});

export default AuthScreen;
