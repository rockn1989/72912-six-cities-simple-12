import { createReducer } from '@reduxjs/toolkit';
import { SortTypes } from '../const';
import { offers } from '../mocks/offers';
import { Offer } from '../types/offers';
import { getOffersByCity } from '../utils/getOffersByCity';
import { sortPriceDown, sortPriceUp, sortTopRatedFirst } from '../utils/sortOffersByType';
import { filterOffers, selectCity, sortOffers } from './action';

const DEFAULT_CITY = 'Paris';

type InitialState = {
  city: string;
  sortType: string;
  offers: Offer[];
  offersByCity: Offer[];
}

const initialState:InitialState = {
  city: DEFAULT_CITY,
  sortType: SortTypes.Popular,
  offers: offers,
  offersByCity: getOffersByCity(offers, DEFAULT_CITY),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(filterOffers, (state) => {
      state.offersByCity = getOffersByCity(state.offers, state.city);
      state.sortType = SortTypes.Popular;
    })
    .addCase(sortOffers, (state, action) => {
      state.sortType = action.payload;

      switch(state.sortType) {
        case SortTypes.LowToHigh:
          state.offersByCity = state.offersByCity.sort(sortPriceDown);
          break;
        case SortTypes.HighToLow:
          state.offersByCity = state.offersByCity.sort(sortPriceUp);
          break;
        case SortTypes.TopRatedFirst:
          state.offersByCity = state.offersByCity.sort(sortTopRatedFirst);
          break;
        default:
          state.offersByCity = getOffersByCity(state.offers, state.city);
      }
    });
});

export { reducer };
