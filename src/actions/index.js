import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';
// API server url
const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  // Returning function instead of usual action object
  // - Access to dispatch method via thunk
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If good request,
        // - Update state to indicate authenticated
        dispatch({ type: AUTH_USER });
        // - Save JWT
        localStorage.setItem('token', response.data.token);
        // - Redirect to route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If bad request, show error to user
        dispatch(authError('Invalid Sign In'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  // Delete JWT
  localStorage.removeItem('token');
  // Update state to indicate not signed in
  return { type: UNAUTH_USER };
}

// Redux Thunk Version
export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}

// Redux Promise Version
// More readable than Redux Thunk (Says Stephen Grider)
// export function fetchMessage() {
//   const request = axios.get(ROOT_URL, {
//     headers: { authorization: localStorage.getItem('token') }
//   });
//
//   return {
//     type: FETCH_MESSAGE,
//     payload: request
//   };
// }
