import { render, screen } from '@testing-library/react';
import { mockStore } from '../../utils/mock-store';
import { Provider } from 'react-redux';

import { createMemoryHistory } from 'history';
import Main from './main';
import { createFakeOffers } from '../../utils/mocks';

import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus, DEFAULT_CITY, SortType, Status } from '../../const';

describe('Main screen', () => {
  const mockOffers = createFakeOffers(5);

  const history = createMemoryHistory();

  it('component should render correctly', () => {
    const store = mockStore({
      OFFER: {
        offers: mockOffers,
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
        authorizationStatus: AuthorizationStatus.Unknown,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('when no offers or empty, MainEmpty component is rendered', () => {
    const mockCity = 'Moscow';

    const store = mockStore({
      OFFER: {
        offers: [],
        offersNearby: [],
        offerById: undefined,
        reviews: [],
        status: Status.Error
      },
      FILTER: {
        city: mockCity,
        sortType: SortType.Popular,
      },
      USER: {
        userData: null,
        authorizationStatus: AuthorizationStatus.Unknown,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(
        `We could not find any property available at the moment in ${mockCity}`
      )
    ).toBeInTheDocument();
  });

});
