import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortTypes } from '../../const';
import { Offer } from '../../types/offers';
import { getOffersByCity } from '../../utils/getOffersByCity';
import { sortPriceDown, sortPriceUp, sortTopRatedFirst } from '../../utils/sortOffersByType';

type InitialState = {
  city: string;
  sortType: string;
  offersByCity: Offer[];
  offers: Offer[];
}

const DEFAULT_CITY = 'Paris';

const initialState: InitialState = {
  city: DEFAULT_CITY,
  sortType: SortTypes.Popular,
  offersByCity: [],
  offers: [],
};

type FilterOffersType = {
  offers: Offer[];
  city: string;
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterOffers: (state, action: PayloadAction<FilterOffersType>) => {
      state.offersByCity = getOffersByCity(action.payload.offers, action.payload.city);
      state.sortType = SortTypes.Popular;
      state.offers = action.payload.offers;
      state.city = action.payload.city;
    },
    sortOffers: (state, action: PayloadAction<InitialState>) => {
      state.sortType = action.payload.sortType;

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
          state.offersByCity = getOffersByCity(state.offers, action.payload.city);
      }
    }
  }
});

export const {filterOffers, sortOffers} = filterSlice.actions;

export default filterSlice.reducer;
