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


