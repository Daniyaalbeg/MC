import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';
import signUpReducer from './signUpReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  userInfo: userInfoReducer,
  signUp: signUpReducer
});

export default rootReducer;