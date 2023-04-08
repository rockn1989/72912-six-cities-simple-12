import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import offerSlice from './offer/offer';
import filterSlice from './filter/filter';
import userSlice from './user/user';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    offer: offerSlice,
    filter: filterSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  }),
});
