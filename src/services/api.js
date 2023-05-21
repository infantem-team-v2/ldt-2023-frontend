import axios from 'axios';


const api = axios.create({
  // baseURL from .env
  baseURL: process.env.BASE_URL
});

export default api;