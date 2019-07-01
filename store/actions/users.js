import {
  ASSIGN_USER,
  ASSIGN_USERS,
  DELETE_USER,
  RESET_USER
} from "../types/user";

import { ASSIGN_TEAMS } from "../types/team";
import Router from "next/router";
import Request from "~/services/BackendApi/Request";
import api from "~/services/BackendApi";

export const resetUser = () => async dispatch => {
  dispatch({
    type: RESET_USER
  });
};

export const assignUser = user => async dispatch => {
  dispatch({
    type: ASSIGN_USER,
    data: user
  });
  return user;
};

export const createUser = user => async (dispatch, getState) => {
  user.organization_id = getState().auth.user.organization_id;
  user.password = "Testpw123";
  user.role = "employee";
  try {
    const { data, status } = await api.users.create(user);
    if (status === 200) {
      return data;
    }
  } catch (e) {
    switch (e.response.status) {
      case 400:
        throw new Error("User with Email exist already");
      case 422:
        //TODO proper output of invalid fields
        throw new Error("invalid input, check email format");
    }
    console.error(e);
  }
  throw new Error("error on Signup");
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

export const fetchUserById = (id, force = false) => async (
  dispatch,
  getState
) => {
  //IF User is alredy present in userList

  //Disabled User caching for users
  /*if (!!getState().users.userList[id] && !force) {
    dispatch({
      type: ASSIGN_USER,
      data: getState().users.userList[id]
    });
  } else {*/
  try {
    let { data, status } = await api.users.fetchUserById(id);
    if (status === 200) {
      await dispatch({
        type: ASSIGN_USER,
        data: data
      });

      return data;
    }
  } catch (e) {
    console.error(e);
  }
  throw new Error("error on loading users");
  //}
};
