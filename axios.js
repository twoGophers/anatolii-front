import axios from 'axios';

let instance = axios.create();

if (typeof window !== 'undefined') {
  const isLocalhost = window.location.hostname === 'localhost';
  const baseURL = isLocalhost ? 'http://localhost:3001' : `${process.env.NEXT_PUBLIC_SERVER_URL}`;

  instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use((config) => {
    const authToken = window.localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = authToken;
    }
    return config;
  });
}

export default instance;
