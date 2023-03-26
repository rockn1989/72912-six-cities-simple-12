import { Offer } from '../types/offers';

export const getOffersByCity = (offers: Offer[], city: string) => {
  const result = offers.filter((offer) => offer.city.name === city);
  return result;
};
