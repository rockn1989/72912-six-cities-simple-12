import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../const';
import { Offer } from '../../types/offers';
import { Review } from '../../types/reviews';
import { fetchOffer, fetchOfferNearby, fetchOffers, fetchReview, sendReview } from '../api-actions';


const DEFAULT_CITY = 'Paris';

type InitialState = {
  city: string;
  offers: Offer[];
  offersNearby: Offer[];
  offerById: Offer | undefined;
  reviews: Review[];
  status: Status;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  offersNearby: [],
  offerById: undefined,
  reviews: [],
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
    builder.addCase(fetchOffers.pending, (state) => {
      state.offers = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchOffers.rejected, (state) => {
      state.offers = [];
      state.status = Status.ERROR;
    });
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchOffer.pending, (state) => {
      state.offerById = undefined;
      state.status = Status.LOADING;
    });
    builder.addCase(fetchOffer.rejected, (state) => {
      state.offerById = undefined;
      state.status = Status.ERROR;
    });
    builder.addCase(fetchOffer.fulfilled, (state, action) => {
      state.offerById = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchOfferNearby.pending, (state) => {
      state.offersNearby = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchOfferNearby.rejected, (state) => {
      state.offersNearby = [];
      state.status = Status.ERROR;
    });
    builder.addCase(fetchOfferNearby.fulfilled, (state, action) => {
      state.offersNearby = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchReview.pending, (state) => {
      state.reviews = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchReview.rejected, (state) => {
      state.reviews = [];
      state.status = Status.ERROR;
    });
    builder.addCase(fetchReview.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(sendReview.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(sendReview.rejected, (state) => {
      state.status = Status.ERROR;
    });
    builder.addCase(sendReview.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.status = Status.SUCCESS;
    });
  },
});

export const {setCity, setOffer} = offerSlice.actions;

export default offerSlice.reducer;
