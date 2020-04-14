import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';
import signUpReducer from './signUpReducer';
import rationInfoReducer from './rationInfoReducer';
import createRationReducer from './createRationReducer';
import orgInfoReducer from './orgInfoReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  userInfo: userInfoReducer,
  signUp: signUpReducer,
  createRation: createRationReducer,
  rationInfo: rationInfoReducer,
  orgInfo: orgInfoReducer
});

export default rootReducer;