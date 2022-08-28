export const CHECK_USER_LOADING = 'CHECK_USER_LOADING';
export const CHECK_USER_LOGOUT = 'CHECK_USER_LOGOUT'
export const SIGNUP_USER = 'SIGNUP_USER'
import axios from "axios";
import { AsyncStorage } from "react-native";
export const userLogin = () => {
  return ((dispatch) => {
    dispatch({
      type: CHECK_USER_LOADING
    });
    axios.post("http://localhost:5000//user/login",
      {
        email: "hamza2016ag7681@gmail.com",
        password: "12345678",
      })
      .then((res) => {
        console.log(res.data.token);
        dispatch({ type: 'CHECK_USER_LOADING', payload: res.data.token })
        AsyncStorage.setItem('token', res.data.token)
        //  npm install @react-native-community/async-storage react redux redux redux-persist redux-thunk
      })
      .catch((err) => {
        console.log('Login Error', err.message);
      });

  })
}
export const userLogout = () => {
  return ((dispatch) => {
    dispatch({
      type: CHECK_USER_LOGOUT
    });



    axios.post(

      "http://localhost:5000//user/login",
      {
        email: "hamza2016ag7681@gmail.com",
        password: "12345678",
      },
    )
      .then((res) => {
        console.log(res.data.token);
        dispatch({ type: 'CHECK_USER_LOGOUT', payload: null })
        AsyncStorage.removeItem('token', res.data.token)

        //  npm install @react-native-community/async-storage react redux redux redux-persist redux-thunk
      })
      .catch((err) => {
        console.log('Logout error', err.message);
      });

  })



}
export const userSignup = () => {
  return ((dispatch) => {
    dispatch({
      type: CHECK_USER_LOADING
    });
    axios(

      "http://localhost:5000//user/register", {

    }

    )
      .then((res) => {
        console.log(res.data.token);
        dispatch({ type: 'SIGNUP_USER', payload: res.data.token })
        AsyncStorage.setItem('token', res.data.token)

      })
      .catch((err) => {
        console.log(err.message);
      });

  })
}

