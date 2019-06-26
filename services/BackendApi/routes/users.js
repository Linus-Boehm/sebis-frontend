import Request from '../Request';
import { API_URL } from '../../../config';

function baseUrl() {
  return API_URL+"/users";
}

export function me(token = null) {
  let headers = {};
  if(token){
    console.log("Make request with token ", token);
    headers = {Authorization: `Bearer ${token}`}
  }
  return Request.get(`${baseUrl()}/me`,{headers: headers});
}

export function fetchById(id) {
  return Request.get(`${baseUrl()}/${id}`);
}

export function create(payload) {
  return Request.post(`${baseUrl()}`, payload);
}

