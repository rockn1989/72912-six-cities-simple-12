import { combineReducers } from '@reduxjs/toolkit';
import offerSlice from './offer/offer';
import filterSlice from './filter/filter';
import userSlice from './user/user';

export const rootReducer = combineReducers({
  offer: offerSlice,
  filter: filterSlice,
  user: userSlice,
});
