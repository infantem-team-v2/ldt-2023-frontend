import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gate.gb.ldt2023.infantem.tech',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export default api;