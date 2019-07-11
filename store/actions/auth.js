import Router from 'next/router';
import api from '~/services/BackendApi';
import Request from '~/services/BackendApi/Request';
import {AUTHENTICATE, LOGOUT, USER} from '../types/auth';
import {ASSIGN_TEAMS} from "../types/team";

// register user
export const register = (userInfo) => async (dispatch) => {
    try {
        const {data, status} = await api.auth.register(userInfo);
        if (status === 200) {
            Router.push('/auth/signin');
            return data
        }
    } catch (e) {
        switch (e.response.status) {
            case 400:
                throw new Error("User with Email exist already")
            case 422:
                //TODO proper output of invalid fields
                throw new Error("invalid input, check password strength and email format")
        }
        console.error(e)
    }
    throw new Error("error on Sigup")

};

// gets token from the api and stores it in the redux store and in cookie
export const login = ({email, password}) => async (dispatch) => {
    try {
        const {data, status} = await api.auth.login({email, password})
        if (status === 200) {
            dispatch({type: AUTHENTICATE, payload: {token: data.token, user: data.user}});
            dispatch({type: ASSIGN_TEAMS, data: data.teams});
            Router.push('/app/dashboard');
            return data
        }
    } catch (e) {
        console.log(e)
        //TODO throw specific error messages for frontend
        switch (e.response.status) {
            case 422:

                break;
            case 401:

                break;
            case 500:

                break;
            default:

                break;
        }
    }
    throw new Error("error on login user")

};

export const reauthenticate = async (dispatch) => {
    console.log("action:auth:reauthenticate");
    if (process.browser && localStorage.getItem('access_token')) {
        console.log("action:auth:reauthenticate:tokenfound");
        let token = localStorage.getItem('access_token')
        try {
            Request.setToken(token)
            let {status, data} = await api.users.me();
            console.log(status)
            if(status === 200){
                console.log(data)
                dispatch({type: ASSIGN_TEAMS, data: data.teams});
                dispatch({type: AUTHENTICATE, payload: {token: token, user: data.user}});
                return true
            }
        }catch (e) {
            console.error(e)
        }
    }
    return false
}

export const logout = () => async (dispatch) => {
    dispatch({type: LOGOUT, payload: null})
    Router.push("/auth/signin")
}

export const isAutheticated = () => async (dispatch, getState) => {
    const state = getState();
    console.log(state)
    console.log("auth:isAutheticated")
    //TODO: Check if jwt claims are still valid
    if (!state.auth.isAuthenticated) {
        if (!await reauthenticate(dispatch)) {
            //TODO set redirect
            console.log("auth:notAuthenticated")
            return false
        }
    }
    console.log("auth:authenticated")
    return true

}
