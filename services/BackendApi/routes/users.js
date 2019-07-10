import Request from "../Request";
import { API_URL } from "../../../config";

function baseUrl() {
  return API_URL + "/users";
}

export function me(token = null) {
  let headers = {};
  if (token) {
    console.log("Make request with token ", token);
    headers = { Authorization: `Bearer ${token}` };
  }
  return Request.get(`${baseUrl()}/me`, { headers: headers });
}
export function teams() {
  return Request.get(`${baseUrl()}/me/teams`, );
}
export function fetchAll() {
  return Request.get(`${baseUrl()}/`);
}

export function fetchUserById(id) {
  return Request.get(`${baseUrl()}/${id}`);
}

export function create(body) {
  return Request.post(`${baseUrl()}/create`, body);
}

export function update(id, payload) {
  return Request.put(`${baseUrl()}/${id}`, payload);
}
export function deleteById(id) {
  return Request.delete(`${baseUrl()}/${id}`);
}
