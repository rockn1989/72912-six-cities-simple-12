import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/offers';
import { ApiSettings, AppRoute } from '../const';
import { AppDispatch } from '../types/state';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';

export const fetchOffers = createAsyncThunk<Offer[], undefined, {extra: AxiosInstance}>(
  'data/fetchOfferData',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offer[]>(`${ApiSettings.BACKEND_URL}/${ApiSettings.OFFERS_URL}`);
    return data;
  }
);

export const checkAuth = createAsyncThunk<void, undefined, {extra: AxiosInstance}>(
  'user/checkAuth',
  async(_arg, { extra: api}) => {
    await api.get(`${ApiSettings.BACKEND_URL}/${ApiSettings.LOGIN_URL}`);
  }
);

export const login = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const { data } = await api.post<UserData>(`${ApiSettings.BACKEND_URL}/${ApiSettings.LOGIN_URL}`, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  }
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(`${ApiSettings.BACKEND_URL}/${ApiSettings.LOGOUT_URL}`);
    dropToken();
    dispatch(fetchOffers());
  }
);
