import { combineReducers } from "redux";
import authReducer from "./auth";
import teamsReducer from "./teams";
import goalsReducer from "./goals";
import usersReducer from "./users";
import commentsReducer from "./comments";

export default combineReducers({
  teams: teamsReducer,
  auth: authReducer,
  goals: goalsReducer,
  users: usersReducer,
  comments: commentsReducer
});
