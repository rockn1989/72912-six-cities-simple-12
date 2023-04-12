import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import { ApiSettings } from '../const';
import { getToken } from './token';


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: ApiSettings.BACKEND_URL,
    timeout: ApiSettings.REQUEST_TIMEOUT
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers = {
          'x-token': token
        };
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        throw error;
      }
    }
  );

  return api;
};
