import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.gb.ldt2023.infantem.tech',
  withCredentials: true,
});

export default api;