import axios from 'axios';

const baseURL = `${process.env.REACT_APP_BACKEND_DOMAIN}/${process.env.REACT_APP_BACKEND_API_END_POINT}/${process.env.REACT_APP_API_VERSION}`;

export const repository = axios.create({
  baseURL,
  withCredentials: true,
});
