import Request from '../Request';
import { API_URL, MOCK_API_URL } from '../../../config';

function baseUrl() {
    return MOCK_API_URL+"/teams";
}

export function fetchAll() {
    return Request.get(`${baseUrl()}/`);
}




