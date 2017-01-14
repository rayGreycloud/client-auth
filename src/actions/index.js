import axios from 'axios';
// API server url
const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  // Returning function instead of usual action object
  // - Access to dispatch method via thunk
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password });

    // If good request,
    // - Update state to indicate authenticated
    // - Save JWT
    // - Redirect to route '/feature'

    // If bad request,
    // - show error to user

  }
}
