import { combineReducers } from 'redux';
import authReducer from './auth';
import teamReducer from './teams';


export default combineReducers({
    teams: teamReducer
})