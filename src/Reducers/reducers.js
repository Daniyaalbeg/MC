import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';
import signUpReducer from './signUpReducer';
import rationInfoReducer from './rationInfoReducer';
import createRationReducer from './createRationReducer';
import orgInfoReducer from './orgInfoReducer';
import homeViewReducer from './homeViewReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  info: homeViewReducer,
  userInfo: userInfoReducer,
  signUp: signUpReducer,
  createRation: createRationReducer,
  rationInfo: rationInfoReducer,
  orgInfo: orgInfoReducer
});

export default rootReducer;