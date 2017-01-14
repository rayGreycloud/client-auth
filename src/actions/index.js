

export function signinUser({ email, password }) {
  // Returning function instead of usual action object
  // Access to dispatch method via thunk
  return function(dispatch) {
    // Submit email/password to server

    // If good request,
      // Update state to indicate authenticated
      // Save JWT
      // Redirect to route '/feature'

    // If bad request,
      // show error to user
      
  }
}
