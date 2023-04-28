import { render, screen, within } from '@testing-library/react';
import { createFakeOffers } from '../../utils/mocks';
import OffersList from './offers-list';

import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { mockStore } from '../../utils/mock-store';
import { AuthorizationStatus, DEFAULT_CITY, SortType, Status } from '../../const';
import { Provider } from 'react-redux';

describe('Component: OffersList', () => {
  const mockOffers = createFakeOffers(5);
  const history = createMemoryHistory();

  const store = mockStore(
    {
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
        authorizationStatus: AuthorizationStatus.Auth,
      },
    }
  );

  const PlacesListWithHistoryRouter = (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <OffersList offers={mockOffers} />
      </HistoryRouter>
    </Provider>
  );

  it ('should display a list of offers', () => {
    render(PlacesListWithHistoryRouter);

    const list = screen.getByTestId('places-list');
    const items = within(list).getAllByTestId('place-card-container');

    expect(items.length).toEqual(mockOffers.length);
  });
});
