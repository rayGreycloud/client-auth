import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  AUTH_ERROR
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
        dispatch(authError('Invalid Login'));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
