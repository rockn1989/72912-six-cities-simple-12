import { createAPI } from '../services/api';
import { Action } from 'redux';
import { State } from '../types/state';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
export const mockAPI = new MockAdapter(api);

export const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);
