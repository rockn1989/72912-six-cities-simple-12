import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../const';
import { Offer } from '../../types/offers';
import { fetchOffers } from '../api-actions';


const DEFAULT_CITY = 'Paris';

type InitialState = {
  city: string;
  offers: Offer[];
  status: Status;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  status: Status.LOADING
};

const offerSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setOffer: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOffers.pending, (state, _) => {
      state.offers = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchOffers.rejected, (state, _) => {
      state.offers = [];
      state.status = Status.ERROR;
    });
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.status = Status.SUCCESS;
    });
  },
});

export const {setCity, setOffer} = offerSlice.actions;

export default offerSlice.reducer;
