import { combineReducers } from 'redux';
// Using ES2015 syntax to rename reducer in import
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({ form });

export default rootReducer;
