import { ASSIGN_USER, ASSIGN_USERS, DELETE_USER } from "../types/user";
import api from "~/services/BackendApi";

export const assignUser = user => async dispatch => {
  dispatch({
    type: ASSIGN_USER,
    data: user
  });
  return user;
};

export const createUser = user => async dispatch => {
  try {
    console.log("action:user:create");
    console.log(user);
    let { data, status } = await api.users.create(user);
    if (status === 200) {
      dispatch({
        type: ASSIGN_USER,
        data: data
      });
      dispatch({
        type: ASSIGN_USERS,
        data: data
      });
    }
  } catch (e) {}
};
export const updateUser = (id, user) => async dispatch => {
  try {
    console.log("action:user:update");
    console.log(user);
    let { data, status } = await api.users.update(id, user);
    if (status === 200) {
      dispatch({
        type: ASSIGN_USER,
        data: data
      });
      dispatch({
        type: ASSIGN_USERS,
        data: data
      });
    }
  } catch (e) {}
};

export const deleteUser = id => async dispatch => {
  try {
    console.log("action:user:delete");
    let { data, status } = await api.users.deleteById(id);
    if (status === 200) {
      dispatch({
        type: DELETE_USER,
        data: id
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export const fetchUsers = () => async dispatch => {
  try {
    console.log("FetchUsers...");
    let { data, status } = await api.users.fetchAll();

    console.log(status);
    if (status === 200) {
      dispatch({
        type: ASSIGN_USERS,
        data
      });
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  throw new Error("error on loading users");
};
