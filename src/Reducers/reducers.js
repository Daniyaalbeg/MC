import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  userInfo: userInfoReducer,
});

export default rootReducer;