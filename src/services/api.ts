import axios from 'axios';

const api = axios.create({
  baseURL: 'https://happyop.herokuapp.com'
});

export default api;
