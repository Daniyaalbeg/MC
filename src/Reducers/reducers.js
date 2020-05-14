import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';
import signUpReducer from './signUpReducer';
import eventInfoReducer from './eventInfoReducer';
import createEventReducer from './createEventReducer';
import updateReducer from './updateReducer';
import orgInfoReducer from './orgInfoReducer';
import homeViewReducer from './homeViewReducer';
import deleteReducer from './deleteReducer';
import cnicReducer from './cnicReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  info: homeViewReducer,
  userInfo: userInfoReducer,
  signUp: signUpReducer,
  createEvent: createEventReducer,
  updateInfo: updateReducer,
  eventInfo: eventInfoReducer,
  orgInfo: orgInfoReducer,
  deleteInfo: deleteReducer,
  cnicInfo: cnicReducer
});

export default rootReducer;