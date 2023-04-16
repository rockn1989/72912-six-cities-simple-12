import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Offer } from '../../types/offers';
import { Review } from '../../types/reviews';
import { fetchOffer, fetchOfferNearby, fetchOffers, fetchReview, sendReview } from '../api-actions';

type InitialState = {
  offers: Offer[];
  offersNearby: Offer[];
  offerById: Offer | undefined;
  reviews: Review[];
  status: Status;
}

const initialState: InitialState = {
  offers: [],
  offersNearby: [],
  offerById: undefined,
  reviews: [],
  status: Status.Loading
};

const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setOffer: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOffers.pending, (state) => {
      state.offers = [];
      state.status = Status.Loading;
    })
      .addCase(fetchOffers.rejected, (state) => {
        state.offers = [];
        state.status = Status.Error;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.status = Status.Success;
      })

      .addCase(fetchOffer.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.offerById = undefined;
        state.status = Status.Error;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offerById = action.payload;
        state.status = Status.Success;
      })

      .addCase(fetchOfferNearby.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchOfferNearby.rejected, (state) => {
        state.offersNearby = [];
        state.status = Status.Error;
      })
      .addCase(fetchOfferNearby.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
        state.status = Status.Success;
      })

      .addCase(fetchReview.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchReview.rejected, (state) => {
        state.reviews = [];
        state.status = Status.Error;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.status = Status.Success;
      })

      .addCase(sendReview.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(sendReview.rejected, (state) => {
        state.status = Status.Error;
      })
      .addCase(sendReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.status = Status.Success;
      });
  },
});

export const {setOffer} = offerSlice.actions;

export default offerSlice.reducer;
