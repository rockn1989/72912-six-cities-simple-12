import { Offer } from '../types/offers';

const getCityData = (offers: Offer[] | undefined, cityName: string) => {
  if (offers) {
    const offersByCity = offers.filter((offer) => offer.city.name === cityName);
    return offersByCity.length && offersByCity[0].city;
  }
};

export { getCityData };
