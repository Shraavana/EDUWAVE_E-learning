import axios from 'axios';

const accessToken = localStorage.getItem("adminToken");

const Instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});
export default Instance;
