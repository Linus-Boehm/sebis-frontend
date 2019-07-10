import {ASSIGN_COMMENTS, ASSIGN_COMMENT, RESET_COMMENT} from "../types/comment";
import { keyBy } from "lodash";

const initialState = {
  comment: {
    createdBy: "",
    text: "",
    date: ""
  },
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
    case ASSIGN_COMMENT:
      return {
        ...state,
        comment: { ...state.comment, ...data }
      };
    case RESET_COMMENT:
      return {
        ...state,
        comment: {...initialState.comment}
      };
    default:
      return state;
  }
};
