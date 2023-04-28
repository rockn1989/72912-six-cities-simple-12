import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus, DEFAULT_CITY, SortType, Status } from '../../const';
import { createFakeOffers } from '../../utils/mocks';
import { mockStore } from '../../utils/mock-store';
import HistoryRouter from '../history-route/history-route';
import Map from './map';

describe('Component: Map', () => {

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
        <Map
          selectedOffer={undefined}
          offers={[]}
        />
      </HistoryRouter>
    </Provider>
  );


  it('should render correctly', () => {
    render(PlacesListWithHistoryRouter);

    expect(screen.getByTestId('map-block'))
      .toBeInTheDocument();
  });
});
