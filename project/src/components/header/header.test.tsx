import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { mockStore } from '../../utils/mock-store';
import { createFakeUser } from '../../utils/mocks';

import Header from './header';
import { SortType, Status, DEFAULT_CITY, AuthorizationStatus } from '../../const';
import HistoryRouter from '../history-route/history-route';

describe('Component: Header', () => {
  describe('authorization status is Auth', () => {
    const mockUser = createFakeUser();
    const store = mockStore(
      {
        OFFER: {
          offers: [],
          offersNearby: [],
          offerById: undefined,
          reviews: [],
          status: Status.Success
        },
        FILTER: {
          city: DEFAULT_CITY,
          sortType: SortType.Popular,
        },
        USER: {
          userData: {...mockUser, token: 'sometoken'},
          authorizationStatus: AuthorizationStatus.Auth,
        },
      }
    );

    const history = createMemoryHistory();
    it('email and sign out function are shown', () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Header />
          </HistoryRouter>
        </Provider>
      );

      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
      expect(screen.getByText('Sign out')).toBeInTheDocument();
    });

    it('when the user signs out, logoutAction is dispatched', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Header />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByText('Sign out'));

      const actions = store.getActions();
      expect(actions[0].type).toBe('user/logout/pending');
    });
  });

  describe('authorization status is NoAuth', () => {

    const store = mockStore(
      {
        OFFER: {
          offers: [],
          offersNearby: [],
          offerById: undefined,
          reviews: [],
          status: Status.Success
        },
        FILTER: {
          city: DEFAULT_CITY,
          sortType: SortType.Popular,
        },
        USER: {
          userData: null,
          authorizationStatus: AuthorizationStatus.NoAuth,
        },
      }
    );

    const history = createMemoryHistory();
    it('\'Sing in\' is shown', () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Header />
          </HistoryRouter>
        </Provider>
      );

      expect(screen.getByText('Sign in')).toBeInTheDocument();
    });

    it('when the user clicks sign in, the user is redirected to Login page', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Header />
          </HistoryRouter>
        </Provider>
      );

      await act(async () => await userEvent.click(screen.getByText('Sign in')));

      await waitFor(() => {
        expect(history.location.pathname).toBe('/login');
      });
    });
  });
});
