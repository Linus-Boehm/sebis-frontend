import Router from 'next/router';
import api from '~/services/BackendApi';
import {AUTHENTICATE, LOGOUT, USER} from '../types/auth';

// register user
export const register = (userInfo) => async (dispatch) => {
    try {
        const {data, status} = await api.auth.register(userInfo);
        if (status === 200) {
            Router.push('/auth/signin');
            return data
        }
    } catch (e) {
        console.error(e)
    }
    throw new Error("error on Sigin")

};

// gets token from the api and stores it in the redux store and in cookie
export const login = ({email, password}) => async (dispatch) => {
    try {
        const {data, status} = await api.auth.login({email, password})
        if (status === 200) {
            dispatch({type: AUTHENTICATE, payload: {token: data.token, user: data.user}});
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

export const reauthenticate = () =>  {
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
    if(!state.auth.isAuthenticated){
        if (!await reauthenticate()){
            //TODO set redirect
            console.log("auth:notAuthenticated")
            dispatch({type: LOGOUT, payload: null})
            return false
        }
    }
    console.log("auth:authenticated")
    return true

}
