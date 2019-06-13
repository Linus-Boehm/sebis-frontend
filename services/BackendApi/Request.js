import Axios from 'axios';

export class Request {

  constructor() {
    this.axios = Axios.create({
      timeout: 10000
    });
  }

  performRequest = async (url, body, type) => {
    return this.axios[ type ](url, body);
  };

  get = async (url) => this.performRequest(url, null, 'get');
  post = async (url, body) => this.performRequest(url, body, 'post');
  patch = async (url, body) => this.performRequest(url, body, 'patch');
  delete = async (url, body) => this.performRequest(url, body, 'delete');
}

export default new Request();
