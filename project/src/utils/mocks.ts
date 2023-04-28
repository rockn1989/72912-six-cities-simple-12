import { address, datatype, finance, lorem, name, internet, date, image } from 'faker';
import { MAX_PHOTO_COUNT } from '../const';
import { City, Host, Offer } from '../types/offers';
import { Review } from '../types/reviews';
import { UserData } from '../types/user-data';

const createFakeHost = (): Host => ({
  id: datatype.number(100),
  isPro: datatype.boolean(),
  name: name.firstName(),
  avatarUrl: internet.url(),
});


const createFakeCity = (): City => ({
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(15),
  },
  name: address.cityName(),
});

const createFakePreviewImages = () => new Array(MAX_PHOTO_COUNT).fill('').map((_) => internet.url());

const createFakeGoods = () => new Array(datatype.number(4)).fill('').map((_) => lorem.words(4));

const createFakeOffer = (): Offer => ({
  id: datatype.number(10000),
  isPremium: datatype.boolean(),
  title: lorem.sentence(6),
  previewImage: image.abstract(260,200),
  price: Number(finance.amount(1, 1000)),
  type: lorem.words(4),
  rating: datatype.number(5),
  description: lorem.paragraphs(1, '\n'),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(15),
  },

  images: createFakePreviewImages(),
  bedrooms: datatype.number(3),
  maxAdults: datatype.number(4),
  goods: createFakeGoods(),
  host: createFakeHost(),
  city: createFakeCity(),
});

const createFakeUser = (): Omit<UserData, 'token'> => ({
  id: datatype.number(10000),
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean(),
  name: name.title(),
  email: internet.avatar()
});

const createFakeReview = (): Review => ({
  id: datatype.number(10000),
  date: date.past().toISOString(),
  rating: datatype.number(5),
  comment: lorem.paragraphs(1, '\n'),
  user: {
    id: datatype.number(10000),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
    name: name.title(),
  }
});

const createFakeReviews = (count: number): Review[] => new Array(count).fill({}).map((_) => createFakeReview());

const createFakeOffers = (count: number): Offer[] => new Array(count).fill({}).map((_) => createFakeOffer());

export {
  createFakeOffers,
  createFakeOffer,
  createFakeReviews,
  createFakeReview,
  createFakeUser
};
