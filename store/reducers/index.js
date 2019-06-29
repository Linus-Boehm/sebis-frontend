import { combineReducers } from 'redux';
import authReducer from './auth';
import teamsReducer from './teams';
import goalsReducer from './goals';


export default combineReducers({
  teams: teamsReducer,
  auth: authReducer,
  goals: goalsReducer
})