import axios from 'axios';
import { LOCAL_STORAGE_TOKEN } from '../constants/constants';

export const BASE_API_ENDPOINT = process.env.REACT_APP_BASE_URL;

const defaultConfig = {
  // Here you can add boilerplate configuration
  // Example config:
  baseURL: BASE_API_ENDPOINT,
  // headers: { 'X-Authorization': myToken }
  // for more info visit https://github.com/axios/axios#request-config
  responseType: 'json', // this will be the default response.
};

/**
 * Axios instance closure.
 */
function request(config = defaultConfig) {
  const instance = axios.create(config);

  function getToken() {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN);
  }

  function addAuthToken() {
    const auth = instance.defaults.headers.Authorization;

    if (!auth) {
      const token = getToken();
      instance.defaults.headers.Authorization = `Bearer ${token}`;
    }

    return instance;
  }

  function setAuthToken(token) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
    instance.defaults.headers.Authorization = `Bearer ${token}`;
  }

  function removeToken() {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    instance.defaults.headers.Authorization = undefined;
  }

  return {
    ...instance,
    getToken,
    addAuthToken,
    setAuthToken,
    removeToken,
  };
}

export default request();
