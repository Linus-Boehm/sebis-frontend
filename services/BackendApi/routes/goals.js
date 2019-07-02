import Request from '../Request';
import { API_URL } from '../../../config';

function baseUrl() {
  return API_URL + "/goals";
}

export function fetchById(id) {
  return Request.get(`${baseUrl()}/${id}`);
}

export function fetchAllAssignedGoals() {
  return Request.get(`${baseUrl()}/assigned`);
}

export function fetchAllTeamGoals() {
  return Request.get(`${baseUrl()}/team`);
}

export function fetchAllOrganizationGoals() {
  return Request.get(`${baseUrl()}/organization`);
}




