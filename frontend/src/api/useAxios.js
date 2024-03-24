import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const baseURL = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL,
}) 

export const authAxios = axios.create({
  baseURL,
  withCredentials: true,
});
  
authAxios.interceptors.request.use(async (config) => {
  const access = localStorage.getItem('access');;

  config.headers = {
    'Authorization': `Bearer ${access}`,
  };

  const decoded = jwtDecode(access);

  const exp = new Date(decoded.exp * 1000);
  const now = new Date();
  const fiveMinutes = 1000 * 60 * 5;

  if(exp.getTime() - now.getTime() < fiveMinutes) {
    try {
      const oldRefresh = localStorage.getItem('refresh');
      const res = await axi.post('/users/refresh/', { oldRefresh });
      const { access, refresh } = res.data;

      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

    } catch(err) {
      localStorage.clear();
      window.location.href = '/login';
    }
  } else {
    return config;
  };

  return config;
});