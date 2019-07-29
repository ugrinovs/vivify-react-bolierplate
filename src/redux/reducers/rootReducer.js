import { combineReducers } from 'redux';
import authReducer from './authReducer';
import initialStateReducer from './initialStateReducer';

export default combineReducers({
  auth: authReducer,
  initialState: initialStateReducer,
});
