import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace, SortType } from '../../const';

type InitialState = {
  city: string;
  sortType: string;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  sortType: SortType.Popular,
};

const filterSlice = createSlice({
  name: NameSpace.Filter,
  initialState,
  reducers: {
    filterOffers: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    sortOffers: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    }
  }
});

export const {filterOffers, sortOffers} = filterSlice.actions;

export default filterSlice.reducer;
