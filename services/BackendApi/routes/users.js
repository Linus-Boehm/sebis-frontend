import Request from '../Request';
import { API_URL } from '../../../config';

function baseUrl() {
  return API_URL;
}

export function login(body) {
  return Request.get(`${baseUrl()}/login`, body);
}

export function register(body) {
  return Request.get(`${baseUrl()}/register`, body);
}


