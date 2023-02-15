import axios from 'axios';
import { API } from './API';
const { get, post, put, patch, } = axios
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
    patch: (url, data, options = {}) =>
      patch(url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) =>
      put(url, data, { ...defaultOptions, ...options }),
    deleteItem: (url, options = {}) => axios.delete(url, { ...defaultOptions, ...options }),
  };
};
export default Axios;