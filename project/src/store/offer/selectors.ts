import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { getSelectedCity } from '../filter/selectors';


export const getOffersAll = (state: State) => state[NameSpace.Offer].offers;
export const getStatus = (state: State) => state[NameSpace.Offer].status;
export const getOfferById = (state: State) => state[NameSpace.Offer].offerById;

export const getReviewsForOfferById = (state: State) => state[NameSpace.Offer].reviews;
export const getOffersNearby = (state: State) => state[NameSpace.Offer].offersNearby;


export const getOffersByCity = createSelector(
  getOffersAll,
  getSelectedCity,
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);
