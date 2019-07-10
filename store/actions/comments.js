import {ASSIGN_COMMENT, ASSIGN_COMMENTS, RESET_COMMENT} from "../types/comment";
import api from "~/services/BackendApi";

export const assignComment = comment => async dispatch => {
  dispatch({
    type: ASSIGN_COMMENT,
    data: comment
  });
  return comment;
};

export const createComment = (comment, goalId) => async dispatch => {
  try {
    console.log("action:comment:create");
    let { data, status } = await api.comments.create({ comment, goalId });
    if (status === 200) {
      dispatch({
        type: RESET_COMMENT,
        data: {}
      });
      dispatch({
        type: ASSIGN_COMMENTS,
        data: data
      });
    }
  } catch (e) {}
};

export const fetchComments = relatedToID => async dispatch => {
  try {
    console.log("FetchComments...");
    let { data, status } = await api.comments.fetchByRelatedToID(relatedToID);

    console.log(status);
    if (status === 200) {
      dispatch({
        type: ASSIGN_COMMENTS,
        data
      });
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  throw new Error("error on loading comments");
};
