import {ASSIGN_COMMENTS, ASSIGN_COMMENT, RESET_COMMENT} from "../types/comment";
import { keyBy } from "lodash";

const initialState = {

  commentList: {}
};
export default (state = initialState, { type, data }) => {
  console.log("reducer:comments:" + type);
  switch (type) {
    case ASSIGN_COMMENTS:
      return {
        ...state,
        commentList: { ...state.commentList, ...keyBy(data, "_id") }
      };
    default:
      return state;
  }
};
