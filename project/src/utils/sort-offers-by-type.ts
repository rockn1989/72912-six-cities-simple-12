import { SortType } from '../const';
import { Offer } from '../types/offers';

const sortPriceDown = (offerA:Offer, offerB:Offer) => offerA.price - offerB.price;
const sortPriceUp = (offerA:Offer, offerB:Offer) => offerB.price - offerA.price;
const sortTopRatedFirst = (offerA:Offer, offerB:Offer) => offerB.rating - offerA.rating;

const sortOffers = (offers: Offer[], sortType: string) => {
  switch(sortType) {
    case SortType.LowToHigh:
      return offers && offers.slice().sort(sortPriceDown);
    case SortType.HighToLow:
      return offers && offers.slice().sort(sortPriceUp);
    case SortType.TopRatedFirst:
      return offers && offers.slice().sort(sortTopRatedFirst);
    default:
      return offers;
  }
};

export {
  sortPriceDown,
  sortPriceUp,
  sortTopRatedFirst,
  sortOffers
};

