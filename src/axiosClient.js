import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  json: true,
});

export default axiosClient;