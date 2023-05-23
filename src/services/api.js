import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gate.gb.ldt2023.infantem.tech',
  withCredentials: true,
  headers: {
    'Access-control-allow-origin': '*',
    'Content-Type': '*/*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  }
});

export default api;