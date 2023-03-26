import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { getOffersByCity } from '../utils/getOffersByCity';
import { filterOffers, selectCity } from './action';

const DEFAULT_CITY = 'Paris';

const initialState = {
  city: DEFAULT_CITY,
  offers: getOffersByCity(offers, DEFAULT_CITY)
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(filterOffers, (state) => {
      state.offers = getOffersByCity(offers, state.city);
    });
});

export { reducer };
