import Router from "next/router";
import api from "~/services/BackendApi";
import Request from "~/services/BackendApi/Request";
import { AUTHENTICATE, LOGOUT, USER } from "../types/auth";
import { ASSIGN_TEAMS } from "../types/team";

// register user
export const register = userInfo => async dispatch => {
  try {
    //Clear existing old token
    dispatch({ type: LOGOUT, payload: null });
    const { data, status } = await api.auth.register(userInfo);
    if (status === 200) {
      Router.push("/auth/signin");
      return data;
    }
  } catch (e) {
    switch (e.response.status) {
      case 400:
        throw "Invalid request";
      case 409:
        throw "User with Email already exists";
      case 422: {
        const { errors } = e.response.data
        throw errors[ 0 ] ? errors[ 0 ].msg : 'Invalid input';
      }

      default:
        throw "Oops... an error occurred!";
    }
  }
  throw new Error("Error on Sigup");
};

// gets token from the api and stores it in the redux store and in cookie
export const login = ({ email, password }) => async dispatch => {
  try {
    const { data, status } = await api.auth.login({ email, password });
    if (status === 200) {
      dispatch({
        type: AUTHENTICATE,
        payload: { token: data.token, user: data.user }
      });
      dispatch({ type: ASSIGN_TEAMS, data: data.teams });
      Router.push("/app/dashboard");
      return data;
    }
  } catch (e) {
    console.log(e);
    //TODO throw specific error messages for frontend
    switch (e.response.status) {
      case 422:
        throw "Email is invalid";
      case 403:
        throw "User is not confirmed yet, pls check your emails";
      case 404:
        throw "Unknown username or password";
      case 401:
        throw "Unknown username or password";
      case 409:
        throw "Passwords are not equal";
      case 500:
        throw "Unknown server error";

      default:
        throw "Oops... an error occurred!";
    }
  }

  throw new Error("error on login user");
};

export const reauthenticate = async dispatch => {
  console.log("action:auth:reauthenticate");
  if (process.browser && !!localStorage.getItem("access_token")) {
    console.log("action:auth:reauthenticate:tokenfound");
    let token = localStorage.getItem("access_token");
    try {
      Request.setToken(token);
      let { status, data } = await api.users.me();
      console.log(status);
      if (status === 200) {
        dispatch({ type: ASSIGN_TEAMS, data: data.teams });
        dispatch({
          type: AUTHENTICATE,
          payload: { token: token, user: data.user }
        });
        return true;
      }
    } catch (e) {
      dispatch({ type: LOGOUT, payload: null });
      //console.error(e);
    }
  }
  return false;
};

export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT, payload: null });
  Router.push("/auth/signin");
};

export const isAutheticated = () => async (dispatch, getState) => {
  const state = getState();
  console.log(state);
  console.log("auth:isAutheticated");
  //TODO: Check if jwt claims are still valid
  if (!state.auth.isAuthenticated) {
    if (!(await reauthenticate(dispatch))) {
      //TODO set redirect
      console.log("auth:notAuthenticated");
      return false;
    }
  }
  console.log("auth:authenticated");
  return true;
};
