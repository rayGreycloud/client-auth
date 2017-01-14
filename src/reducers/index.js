import { combineReducers } from 'redux';
// Using ES2015 syntax to rename reducer in import
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer
});

export default rootReducer;
