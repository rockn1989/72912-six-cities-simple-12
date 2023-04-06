import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import offerSlice from './offer/offer';
import filterSlice from './filter/filter';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    offer: offerSlice,
    filter: filterSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  }),
});
