import offerSlice from './offer';

import { fetchOffers, fetchOfferNearby, fetchOffer, fetchReview } from '../api-actions';
import { createFakeOffers, createFakeOffer, createFakeReviews } from '../../utils/mocks';
import { Offer } from '../../types/offers';
import { Status } from '../../const';
import { Review } from '../../types/reviews';

const mockOffers: Offer[] = createFakeOffers(5);
const mockOffer: Offer = createFakeOffer();
const mockReviews: Review[] = createFakeReviews(5);

describe('Reducer: Offer', () => {
  let state: {
    offers: Offer[];
    offersNearby: Offer[];
    offerById: Offer | undefined;
    reviews: Review[];
    status: Status;
  };

  beforeEach(() => {
    state = {
      offers: [],
      offersNearby: [],
      offerById: undefined,
      reviews: [],
      status: Status.Loading
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offerSlice(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        offers: [],
        offersNearby: [],
        offerById: undefined,
        reviews: [],
        status: Status.Loading
      });
  });

  describe('fetchOffers test', () => {
    it('should update offers to "Success" if fetchOffers action fulfilled', () => {
      expect(offerSlice(state, { type: fetchOfferNearby.fulfilled.type, payload: mockOffers }))
        .toEqual({...state, offersNearby: mockOffers, status: Status.Success});
    });

    it('should update offers to "Error" if fetchOffers action rejected', () => {
      expect(offerSlice(state, { type: fetchOfferNearby.rejected.type, payload: mockOffers }))
        .toEqual({...state, status: Status.Error});
    });
  });

  describe('fetchOfferNearby test', () => {
    it('should update offers to "Success" if fetchOfferNearby action fulfilled', () => {
      expect(offerSlice(state, { type: fetchOffers.fulfilled.type, payload: mockOffers }))
        .toEqual({...state, offers: mockOffers, status: Status.Success});
    });

    it('should update offers to "Error" if fetchOfferNearby action rejected', () => {
      expect(offerSlice(state, { type: fetchOffers.rejected.type, payload: mockOffers }))
        .toEqual({...state, status: Status.Error});
    });
  });


  describe('fetchOffer test', () => {
    it('should update offers to "Success" if fetchOffer action fulfilled', () => {
      expect(offerSlice(state, { type: fetchOffer.fulfilled.type, payload: mockOffer }))
        .toEqual({...state, offerById: mockOffer, status: Status.Success});
    });

    it('should update offers to "Error" if fetchOffer action rejected', () => {
      expect(offerSlice(state, { type: fetchOffer.rejected.type, payload: mockOffer }))
        .toEqual({...state, status: Status.Error});
    });
  });

  describe('fetchReview test', () => {
    it('should update offers to "Success" if fetchReview action fulfilled', () => {
      expect(offerSlice(state, { type: fetchReview.fulfilled.type, payload: mockReviews }))
        .toEqual({...state, reviews: mockReviews, status: Status.Success});
    });

    it('should update offers to "Error" if fetchReview action rejected', () => {
      expect(offerSlice(state, { type: fetchReview.rejected.type, payload: mockReviews }))
        .toEqual({...state, status: Status.Error});
    });
  });

});
