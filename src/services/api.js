import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gate.gb.ldt2023.infantem.tech',
});

export default api;