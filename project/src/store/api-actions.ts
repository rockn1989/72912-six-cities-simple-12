import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/offers';
import { ApiSettings, AppRoute, NameSpace } from '../const';
import { AppDispatch, State } from '../types/state';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { Review } from '../types/reviews';
import { toast } from 'react-toastify';

export const fetchOffers = createAsyncThunk<Offer[], undefined, {extra: AxiosInstance}>(
  'offer/fetchOfferData',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offer[]>(`${ApiSettings.BACKEND_URL}/${ApiSettings.OFFERS_URL}`);
    return data;
  }
);

export const fetchReview = createAsyncThunk<Review[], number, {extra: AxiosInstance}>(
  'offer/fetchReviewData',
  async (offerId, {extra: api}) => {
    try {
      const { data } = await api.get<Review[]>(`${ApiSettings.BACKEND_URL}/${ApiSettings.COMMENTS_URL}/${offerId}`);
      return data;
    } catch {
      return [];
    }
  }
);

export const sendReview = createAsyncThunk<Review[], {offerId: number; comment: string; rating: number} , {
  state: State;
  extra: AxiosInstance;
}>(
  'offer/sendReviewData',
  async ({offerId, comment, rating}, {extra: api, getState }) => {
    try {
      const { data } = await api.post<Review[]>(`${ApiSettings.BACKEND_URL}/${ApiSettings.COMMENTS_URL}/${offerId}`, {comment, rating});
      return data;
    } catch {
      toast.warn('Sorry, we couldn\'t send your review');
      return getState()[NameSpace.Offer].reviews;
    }
  }
);

export const fetchOfferNearby = createAsyncThunk<Offer[], number, {extra: AxiosInstance}>(
  'offer/fetchOfferNearby',
  async (offerId, {extra: api}) => {
    try {
      const { data } = await api.get<Offer[]>(`${ApiSettings.BACKEND_URL}/${ApiSettings.OFFERS_URL}/${offerId}/${ApiSettings.OFFERS_NEARBY_URL}`);
      return data;
    } catch {
      toast.warn('Reviews nearby were not found.');
      return [];
    }
  }
);


export const fetchOffer = createAsyncThunk<Offer | undefined, number , {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'offer/fetchOfferByIdData',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Offer>(`${ApiSettings.BACKEND_URL}/${ApiSettings.OFFERS_URL}/${offerId}`);
      dispatch(fetchReview(offerId));
      dispatch(fetchOfferNearby(offerId));
      return data;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
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
