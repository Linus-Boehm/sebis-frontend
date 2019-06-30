import { combineReducers } from "redux";
import authReducer from "./auth";
import teamReducer from "./teams";
import userReducer from "./users";

export default combineReducers({
  teams: teamReducer,
  auth: authReducer,
  users: userReducer
});
