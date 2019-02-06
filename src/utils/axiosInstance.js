import axios from 'axios';
import { getToken } from './auth';

const instance = axios.create({
  baseURL:
    process.env.FAST_FOOD_FAST_API_URL || 'https://fast-food-fast-20188.herokuapp.com/api/v1',
});

instance.interceptors.request.use((config) => {
  const requestConfig = { ...config };
  requestConfig.headers.token = getToken();
  return requestConfig;
});

export default instance;
