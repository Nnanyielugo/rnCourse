import { AsyncStorage } from 'react-native';

import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import App from '../../../App';

const API_KEY = "AIzaSyDiVJP2eOprZPrZT6m9G_5Lofx38j1U3CU";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading())
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + API_KEY
    if (authMode === "signup") {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(err => {
      console.log(err);
      alert("Authentication failed, please try again");
      dispatch(uiStopLoading())
    })
    .then(res => res.json())
    .then(parsedResponse => {
      dispatch(uiStopLoading())
      if (!parsedResponse.idToken) {
        alert("Authentication failed, please try again")
      } else {
        dispatch(
          authStoreToken(
            parsedResponse.idToken, 
            parsedResponse.expiresIn, 
            parsedResponse.refreshToken
          )
        )
        startMainTabs();
      }
    })
  }
}

export const  authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    dispatch(authSetToken(token, expiryDate));
    AsyncStorage.setItem("ap:auth:token", token);
    AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("ap:auth:refreshToken", refreshToken)
  }
}

export const authSetToken = (token, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    payload: token,
    expiryDate: expiryDate
  }
}

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      // check id token exists in store
      const token = getState().auth.token;
      const expiryDate = getState().auth.expiryDate;
      if (!token || new Date(expiryDate) <= new Date()) {
        let fetchedToken;
        AsyncStorage.getItem("ap:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage
            if(!tokenFromStorage) {
              reject();
              return
            }
            return AsyncStorage.getItem("ap:auth:expiryDate")
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now ) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken)
            } else {
              reject()
            }            
          })
          .catch(err => reject())
      } else {
        resolve(token);
      }
    })
   return promise
   .catch(err => {
      // check if refresh token is in async storage 
      return AsyncStorage.getItem("ap:auth:refreshToken")
        .then(refreshToken => {
          console.log("REFRESH T", refreshToken)
          return fetch("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, {
            method: "POST",
            headers: {
              "Content-Type": "Content-Type: application/x-www-form-urlencoded"
            },
            body: "grant_type=refresh_token&refresh_token=" + refreshToken
          })
        })
        .then(res => res.json())
        .then(parsedResponse => {
          console.log("Parsed response for refresh token", parsedResponse)
          if (parsedResponse.id_token){
            dispatch(
              authStoreToken(
                parsedResponse.id_token, 
                parsedResponse.expires_in, 
                parsedResponse.refresh_token
              )
            );
            return parsedResponse.id_token;
          } else {
            dispatch(authClearStorage())
          }
        })
        .catch(err => {
          console.log("refresh error", err)
          reject();
          dispatch(authClearStorage());
        })
    })
    .then(token => {
      if(!token) {
        console.log("Not token")
        throw(new Error())
      } else {
        return token;
      }
    })
  }
}


export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs()
      })
      .catch(err => console.log("Failed to fetch token", err))
  }
}

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("ap:auth:token");
    AsyncStorage.removeItem("ap:auth:expiryDate")
    // return async remove refresh token so that the method can be subscribed to,
    // and re-routing can be done async
    return AsyncStorage.removeItem("ap:auth:refreshToken")
  }
}

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage())
      .then(() => {
        App();
      });
      dispatch(authRemoveToken())
  }
}

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  }
}