import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';
import signUpReducer from './signUpReducer';
import rationInfoReducer from './rationInfoReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  userInfo: userInfoReducer,
  signUp: signUpReducer,
  rationInfo: rationInfoReducer
});

export default rootReducer;