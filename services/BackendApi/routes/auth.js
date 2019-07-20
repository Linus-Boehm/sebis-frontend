import Request from '../Request';
import { API_URL } from '../../../config';

function baseUrl() {
    return API_URL+"/auth";
}

export function login(body) {
    return Request.post(`${baseUrl()}/login`, body);
}

export function register(body) {
    return Request.post(`${baseUrl()}/register`, body);
}

export function resetPassword(body) {
    return Request.post(`${baseUrl()}/resetpassword`, body);
}

export function requestPasswordResetLink(body) {
    return Request.post(`${baseUrl()}/forgotpassword`, body);
}

export function confirm(body) {
    return Request.post(`${baseUrl()}/confirm`, body);
}


