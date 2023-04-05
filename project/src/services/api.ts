import axios, {AxiosInstance} from 'axios';
import { ApiSettings } from '../const';


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: ApiSettings.BACKEND_URL,
    timeout: ApiSettings.REQUEST_TIMEOUT
  });

  return api;
};
