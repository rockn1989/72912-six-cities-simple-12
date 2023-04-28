export enum AppRoute {
  Login = '/login',
  Offer = '/offer',
  Root = '/',
  NotFound = '/page-not-found'
}

export enum FormSetting {
  MinValueLength = 50,
  MaxValueLength = 300,
  RadioCount = 5,
}

export enum NameSpace {
  Offer = 'OFFER',
  User = 'USER',
  Filter = 'FILTER'
}

export enum RatingTitle {
 'terribly',
 'badly',
 'not bad',
 'good',
 'perfect'
}


export const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];


export enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export enum SortType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

export const ApiSettings = {
  BACKEND_URL: 'https://12.react.pages.academy/six-cities-simple',
  REQUEST_TIMEOUT: 5000,
  OFFERS_URL: 'hotels',
  OFFERS_NEARBY_URL: 'nearby',
  LOGIN_URL: 'login',
  LOGOUT_URL: 'logout',
  COMMENTS_URL: 'comments',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const AVATAR_URL = 'https://i.pravatar.cc/128';
export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';
export const MAX_REVIEWS_COUNT = 10;
export const MAX_PHOTO_COUNT = 6;
export const DEFAULT_CITY = 'Paris';
export const PASSWORD_REG_EXP = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/);
