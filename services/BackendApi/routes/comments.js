import Request from "../Request";
import { API_URL, MOCK_API_URL } from "../../../config";

function baseUrl() {
  return API_URL + "/comments";
}

export function create(payload) {
  return Request.post(`${baseUrl()}`, payload);
}

export function fetchByRelatedToID(related_to) {
  return Request.get(`${baseUrl()}/${related_to}`);
}
