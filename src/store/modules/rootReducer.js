import {combineReducers} from 'redux';

import authReducer from './auth/authState';
import userReducer from './user/userState';

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default reducer;
