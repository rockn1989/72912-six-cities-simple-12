export enum AppRoute {
  Login = '/login',
  Offer = '/offer',
  Root = '/'
}


export enum Settings {
  CardsCount = 25
}

export enum FormSettings {
  MinValueLength = 50,
  MaxValueLength = 300,
  RadioCount = 5
}

export enum TypeHousing {
  'apartment',
  'room',
  'house',
  'hotel'
}

export enum RadioTitle {
 'terribly',
 'badly',
 'not bad',
 'good',
 'perfect'
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum SortTypes {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

export const ApiSettings = {
  BACKEND_URL: 'https://12.react.pages.academy/six-cities-simple',
  REQUEST_TIMEOUT: 5000,
  OFFERS_URL: 'hotels',
  LOGIN_URL: 'login',
  LOGOUT_URL: 'logout'
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const AVATAR_URL = 'https://i.pravatar.cc/128';
export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';
