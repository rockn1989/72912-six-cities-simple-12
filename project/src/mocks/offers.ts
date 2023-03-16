import { AVATAR_URL } from '../const';
import { Offer } from '../types/offers';

export const offers: Offer[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious studio at great location',
    isPremium: true,
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    type: 'apartment',
    rating: 3.7,
    bedrooms: 3,
    maxAdults: 4,
    goods: ['wi-fi', 'heating', 'kitchen'],
    host: {
      avatarUrl: AVATAR_URL,
      id: 1,
      isPro: true,
      name: 'Angelina'
    }
  },
  {
    id: 2,
    title: 'Beautiful & luxurious studio at great location',
    isPremium: false,
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    previewImage: 'img/apartment-01.jpg',
    price: 50,
    type: 'apartment',
    rating: 3,
    bedrooms: 3,
    maxAdults: 4,
    goods: ['wi-fi', 'heating', 'kitchen'],
    host: {
      avatarUrl: AVATAR_URL,
      id: 2,
      isPro: false,
      name: 'Angelina'
    }
  },
  {
    id: 3,
    title: 'Beautiful & luxurious studio at great location',
    isPremium: false,
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    previewImage: 'img/apartment-01.jpg',
    price: 20,
    type: 'apartment',
    rating: 2,
    bedrooms: 3,
    maxAdults: 4,
    goods: ['wi-fi', 'heating', 'kitchen'],
    host: {
      avatarUrl: AVATAR_URL,
      id: 3,
      isPro: false,
      name: 'Angelina'
    }
  },
  {
    id: 4,
    title: 'Beautiful & luxurious studio at great location',
    isPremium: true,
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    previewImage: 'img/apartment-01.jpg',
    price: 600,
    type: 'apartment',
    rating: 4,
    bedrooms: 3,
    maxAdults: 4,
    goods: ['wi-fi', 'heating', 'kitchen'],
    host: {
      avatarUrl: AVATAR_URL,
      id: 4,
      isPro: true,
      name: 'Angelina'
    }
  },
  {
    id: 5,
    title: 'Beautiful & luxurious studio at great location',
    isPremium: true,
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    previewImage: 'img/apartment-01.jpg',
    price: 1000,
    type: 'apartment',
    rating: 5,
    bedrooms: 3,
    maxAdults: 4,
    goods: ['wi-fi', 'heating', 'kitchen'],
    host: {
      avatarUrl: AVATAR_URL,
      id: 5,
      isPro: true,
      name: 'Angelina'
    }
  },
];
