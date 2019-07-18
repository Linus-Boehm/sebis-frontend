import Request from '../Request';
import { API_URL } from '../../../config';

function baseUrl() {
  return API_URL + "/agreements";
}

export function fetchMy() {
  return Request.get(`${baseUrl()}/my`);
}

export function fetchById(id) {
  return Request.get(`${baseUrl()}/${id}`);
}

export function create(payload) {
  return Request.post(`${baseUrl()}`, payload);
}

export function update(payload) {
  return Request.put(`${baseUrl()}/${payload._id}`, payload);
}

export function deleteAgreement(payload) {
  return Request.delete(`${baseUrl()}/${payload._id}`);
}
