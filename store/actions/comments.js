import {ASSIGN_COMMENT, ASSIGN_COMMENTS, RESET_COMMENT} from "../types/comment";
import api from "~/services/BackendApi";



export const createComment = (comment, related_to) => async dispatch => {
  try {
    console.log("action:comment:create");
    console.log(comment);
    console.log(related_to);
    let { data, status } = await api.comments.create({ comment, related_to });
    if (status === 200) {
      dispatch({
        type: ASSIGN_COMMENTS,
        data: [data]
      });
      return data
    }
  } catch (e) {
    console.error(e)
  }
  throw new Error("error on creating comment");
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
