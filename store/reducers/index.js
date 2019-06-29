import { combineReducers } from 'redux';
import authReducer from './auth';
import teamsReducer from './teams';
import goalsReducer from './goals'
import usersReducer from './users';


export default combineReducers({
  teams: teamsReducer,
  auth: authReducer,
  goals: goalsReducer,
  users: usersReducer
})
