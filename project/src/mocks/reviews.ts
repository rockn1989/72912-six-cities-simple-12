import { Review } from '../types/reviews';

const AVATAR_URL = 'https://i.pravatar.cc/128';

export const reviews: Review[] = [
  {
    id: 1,
    date: 'Sat Mar 11 2023 16:05:50 GMT+0300 (Москва, стандартное время)',
    rating: 4,
    comment: 'Lorem Ipsum',
    user: {
      avatarUrl: AVATAR_URL,
      id: 1,
      isPro: false,
      name: 'Dave'
    }
  },
  {
    id: 2,
    date: 'Sat Mar 11 2023 16:05:50 GMT+0300 (Москва, стандартное время)',
    rating: 1,
    comment: 'Lorem Ipsum',
    user: {
      avatarUrl: AVATAR_URL,
      id: 1,
      isPro: false,
      name: 'Oliver'
    }
  },
  {
    id: 3,
    date: 'Sat Mar 11 2023 16:05:50 GMT+0300 (Москва, стандартное время)',
    rating: 5,
    comment: 'Lorem Ipsum',
    user: {
      avatarUrl: AVATAR_URL,
      id: 1,
      isPro: false,
      name: 'Alex'
    }
  }
];
