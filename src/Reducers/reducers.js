import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';
import signUpReducer from './signUpReducer';
import rationInfoReducer from './rationInfoReducer';
import createRationReducer from './createRationReducer';
import updateReducer from './updateReducer';
import orgInfoReducer from './orgInfoReducer';
import homeViewReducer from './homeViewReducer';
import deleteReducer from './deleteReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  info: homeViewReducer,
  userInfo: userInfoReducer,
  signUp: signUpReducer,
  createRation: createRationReducer,
  updateInfo: updateReducer,
  rationInfo: rationInfoReducer,
  orgInfo: orgInfoReducer,
  deleteInfo: deleteReducer
});

export default rootReducer;