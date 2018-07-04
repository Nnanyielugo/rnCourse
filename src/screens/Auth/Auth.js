import React, { Component } from 'react';
import { 
  View, 
  Button, 
  StyleSheet, 
  ImageBackground, 
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/Text/HeadingText';
import MainText from '../../components/UI/Text/MainText';
import BackgroundImage from '../../assets/background.jpg'
import ButtonWithBackground from '../../components/UI/Button/ButtoinWIthBackground';
import validate from '../../utility/validation';
import { tryAuth, authAutoSignIn } from '../../store/actions/index'

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
      authMode: 'login',
      controls: {
        email : {
          value: '',
          valid: false,
          validationRules: {
            isEmail: true
          },
          touched: false
        },
        password: {
          value: '',
          valid: false,
          validationRules: {
            minLength: 6
          },
          touched: false
        },
        confirmPassword: {
          value: '',
          valid: false,
          validationRules: {
            equalTo: 'password'
          },
          touched: false
        }
      }
    }
    Dimensions.addEventListener("change", this.updateStyles)
  }
  authHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    }
    this.props.onTryAuth(authData, this.state.authMode);
  }

  switchauthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      }
    })
  }

  componentDidMount() {
    this.props.onTryAutoSignIn()
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

  updateInputState = (key, value) => {
    let connectedValue = {}
    if(this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      }
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: 
              key === 'password' 
                ? validate(
                    prevState.controls.confirmPassword.value, 
                    prevState.controls.confirmPassword.validationRules, 
                    connectedValue
                  ) 
                  : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(value, prevState.controls[key].validationRules, connectedValue),
            touched: true
          }          
        }
      }
    })
  }

  render() {
    let headingText = null;
    let confirmPasswordCOntrol = null;
    let submitButton = (
      <ButtonWithBackground 
        color="#29aaf4" 
        onPress={this.authHandler}
        disabled={
          !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' ||
          !this.state.controls.email.valid || 
          !this.state.controls.password.valid
        }
      >
        Submit
      </ButtonWithBackground>
    )
    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText>Please Login</HeadingText>
        </MainText>
      )
    }
    if (this.state.authMode === 'signup') {
      confirmPasswordCOntrol = (
        <View 
          style={
            this.state.viewMode === "portrait" 
              ? styles.portraitPasswordWrapper 
              : styles.landscapePasswordWrapper
          }
        >
          <DefaultInput 
            placeholder="Confirm Password" 
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={(value) => this.updateInputState('confirmPassword', value)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry
          /> 
        </View>    
      )
    }
    if (this.props.isLoading) {
      submitButton = <ActivityIndicator color="white" />
    }
    return (
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {headingText}
          <ButtonWithBackground 
            color="#29aaf4" 
            onPress={this.switchauthModeHandler}>
              Switch to {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput 
                placeholder="Your E-mail Address" 
                style={styles.input}
                value={this.state.controls.email.value}
                onChangeText={(value) => this.updateInputState('email', value)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'email-address'}
              />
              <View 
                style={
                  this.state.viewMode === "portrait" || this.state.authMode === 'login'
                    ? styles.portraitPasswordContainer 
                    : styles.landscapePasswordContainer
                  }
                >
                <View 
                  style={
                    this.state.viewMode === "portrait" || this.state.authMode === 'login' 
                      ? styles.portraitPasswordWrapper 
                      : styles.landscapePasswordWrapper
                  }
                >
                  <DefaultInput 
                    placeholder="Password" 
                    style={styles.input}
                    value={this.state.controls.password.value}
                    onChangeText={(value) => this.updateInputState('password', value)}
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                    secureTextEntry
                  />
                </View>
                {confirmPasswordCOntrol}        
              </View>
            </View>
          </TouchableWithoutFeedback>
          {submitButton}
        </KeyboardAvoidingView>
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

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
    onTryAutoSignIn: () => dispatch(authAutoSignIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
