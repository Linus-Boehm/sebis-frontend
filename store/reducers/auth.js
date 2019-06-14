import { AUTHENTICATE, LOGOUT,REAUTHENTICATE, USER,  } from '../types/auth';
import Request from '~/services/BackendApi/Request';
const initialState = {
    token: null,
    user: null,
    isAuthenticated: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return autheticate(state, action);
        case USER:
            return Object.assign({}, state, { user: action.payload });
        case LOGOUT:
            return logout();
        case REAUTHENTICATE:
            autheticate(state, action)
        default:
            return state;
    }
};

const autheticate = (state, action) => {
    let token = action.payload.token;
    let user = action.payload.user;
    setToken(token);
    return {...state, user, token, isAuthenticated: true}
}
const logout = () => {
    // Clear access token from localStorage and reset store
    try {
        localStorage.removeItem('access_token');
    }catch (e) {}

    return {user:null, token:null, isAuthenticated: false}
}
const setToken = (accessToken) => {
    // Saves user access token to localStorage
    try {
        localStorage.setItem('access_token', accessToken)
    }catch (e) {}
    Request.setToken(accessToken);

}