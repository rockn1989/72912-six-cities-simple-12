import { Offer } from '../types/offers';

const sortPriceDown = (offerA:Offer, offerB:Offer) => offerA.price - offerB.price;
const sortPriceUp = (offerA:Offer, offerB:Offer) => offerB.price - offerA.price;
const sortTopRatedFirst = (offerA:Offer, offerB:Offer) => offerB.rating - offerA.rating;


export {
  sortPriceDown,
  sortPriceUp,
  sortTopRatedFirst
};

