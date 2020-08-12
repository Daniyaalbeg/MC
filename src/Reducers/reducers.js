import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';
import signUpReducer from './signUpReducer';
import mapInfoReducer from './mapInfoReducer';
import createEventReducer from './createEventReducer';
import updateReducer from './updateReducer';
import orgInfoReducer from './orgInfoReducer';
import homeViewReducer from './homeViewReducer';
import deleteReducer from './deleteReducer';
import cnicReducer from './cnicReducer';
import groupReducer from './groupReducer';
import projectReducer from './projectReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  info: homeViewReducer,
  userInfo: userInfoReducer,
  signUp: signUpReducer,
  createEvent: createEventReducer,
  updateInfo: updateReducer,
  mapInfo: mapInfoReducer,
  orgInfo: orgInfoReducer,
  deleteInfo: deleteReducer,
  cnicInfo: cnicReducer,
  groupInfo: groupReducer,
  projectInfo: projectReducer
});

export default rootReducer;