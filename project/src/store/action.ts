import { createAction } from '@reduxjs/toolkit';

export const Action = {
  SELECT_CITY: 'SELECT_CITY',
  FILTER_OFFERS: 'FILTER_OFFERS'
};

export const selectCity = createAction(Action.SELECT_CITY, (value: string) => ({
  payload: value,
}));

export const filterOffers = createAction(Action.FILTER_OFFERS);
