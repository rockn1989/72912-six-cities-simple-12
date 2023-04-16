import { combineReducers } from '@reduxjs/toolkit';
import offerSlice from './offer/offer';
import filterSlice from './filter/filter';
import userSlice from './user/user';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.Offer]: offerSlice,
  [NameSpace.Filter]: filterSlice,
  [NameSpace.User]: userSlice,
});
