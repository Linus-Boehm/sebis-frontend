import {
  ASSIGN_TEAMS,
  ASSIGN_TEAM,
  RESET_TEAM,
  DELETE_TEAM
} from "../types/team";
import { keyBy } from "lodash";

const initialState = {
  user: {
    firstname: "",
    lastname: "",
    email: ""
  },
  userList: {}
};
export default (state = initialState, { type, data }) => {
  console.log("reducer:users:" + type);
  switch (type) {


    default:
      return state;
  }
};
