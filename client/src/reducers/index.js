import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';

// eslint-disable-next-line
export default combineReducers({
  alert,
  auth,
  profile
});