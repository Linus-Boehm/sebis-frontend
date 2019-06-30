import { keyBy } from "lodash";
import { ASSIGN_USERS } from "../types/user";

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

    default:
      return state;
  }
};
