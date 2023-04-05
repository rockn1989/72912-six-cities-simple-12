import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/offers.js';
import { ApiSettings } from '../const';

export const fetchOffers = createAsyncThunk<Offer[], undefined, {extra: AxiosInstance}>(
  'data/fetchOfferData',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offer[]>(`${ApiSettings.BACKEND_URL}/${ApiSettings.OFFERS_URL}`);
    return data;
  }
);
