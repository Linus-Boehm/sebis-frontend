import { keyBy } from "lodash";
import {
  ASSIGN_USERS,
  ASSIGN_USER,
  RESET_USER,
  DELETE_USER
} from "../types/user";

const initialState = {
  user: {
    email: "",
    firstname: "",
    lastname: ""
  },
  userList: {}
};
export default (state = initialState, { type, data }) => {
  console.log("reducer:users:" + type);
  switch (type) {
    case ASSIGN_USERS:
      return {
        ...state,
        userList: { ...state.userList, ...keyBy(data, "_id") }
      };
    case ASSIGN_USER:
      return {
        ...state,
        user: { ...state.user, ...data }
      };
    case RESET_USER:
      return {
        ...state,
        user: { ...initialState.user }
      };
    case DELETE_USER:
      let userListCopy = { ...state.userList };
      delete userListCopy[data];
      return {
        ...state,
        userList: userListCopy
      };

    default:
      return state;
  }
};
