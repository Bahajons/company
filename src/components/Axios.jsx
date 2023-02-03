import axios from 'axios';
import { API } from './API';
const { get, post, put, del } = axios

const Axios = () => {
  const token = localStorage.getItem('token');
  const defaultOptions = {
    baseURL: API,
    headers: token
      ? {
        Authorization: `Bearer ${token}`,
      }
      : {}
  };
  return {
    get: (url, options = {}) => get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) =>
      post(url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) =>
      put(url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) => del(url, { ...defaultOptions, ...options }),
  };
};
export default Axios;