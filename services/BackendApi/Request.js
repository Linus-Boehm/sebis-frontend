import Axios from 'axios';

export class Request {
    constructor() {
        this._token = null;
         let instance = Axios.create({
            timeout: 10000,
        });
        instance.interceptors.request.use((config) => {
            if(this._token){
                config.headers.Authorization =   `Bearer ${this._token}`;
            }

            return config;
        });
        this.axios = instance

    }
    setToken(token){
        this._token = token;
    }
    getToken(){
        return this._token;
    }

    performRequest = (url, body, type, config) => {
        return this.axios[type](url, body, config);
    };

    get = (url, config = null) => this.performRequest(url, null, 'get', config);
    post = (url, body, config = {}) => this.performRequest(url, body, 'post', config);
    put = (url, body, config = {}) => this.performRequest(url, body, 'put', config);
    patch = (url, body, config = {}) => this.performRequest(url, body, 'patch', config);
    delete = (url, body, config = {}) => this.performRequest(url, body, 'delete', config);
}

export default new Request();
