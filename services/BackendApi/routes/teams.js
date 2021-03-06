import Request from "../Request";
import { API_URL, MOCK_API_URL } from "../../../config";

function baseUrl() {
  return API_URL + "/teams";
}

export function fetchAll() {
  return Request.get(`${baseUrl()}/`);
}

export function fetchById(id) {
  return Request.get(`${baseUrl()}/${id}`);
}

export function create(payload) {
  return Request.post(`${baseUrl()}`, payload);
}
export function update(id, payload) {
  return Request.put(`${baseUrl()}/${id}`, payload);
}

export function deleteById(id) {
  return Request.delete(`${baseUrl()}/${id}`);
}

export function updateTeamMember(id, payload) {
  return Request.put(`${baseUrl()}/${id}/member`, payload);
}

export function removeTeamMember(id, user_id) {
  return Request.delete(`${baseUrl()}/${id}/member/${user_id}`);
}
