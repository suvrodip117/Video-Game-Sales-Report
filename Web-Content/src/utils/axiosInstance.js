import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SPRINGBOOT_API_BASEURL, //points to backend url
  timeout: 90000, //time to wait for response in milliseconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosInstance;
