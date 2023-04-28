import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { mockStore } from '../../utils/mock-store';
import { createMemoryHistory } from 'history';
import Room from './room';
import HistoryRouter from '../../components/history-route/history-route';

import { createFakeOffer } from '../../utils/mocks';
import { AuthorizationStatus, DEFAULT_CITY, SortType, Status } from '../../const';

describe('Component: Room', () => {
  const mockOffer = createFakeOffer();

  const store = mockStore({
    OFFER: {
      offers: [],
      offersNearby: [],
      offerById: mockOffer,
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
    }
  });
  const history = createMemoryHistory();

  const RoomWithProvider = (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Room />
      </HistoryRouter>
    </Provider>
  );

  it('should render the selected offer correctly', () => {
    render(RoomWithProvider);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.description)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.host.name)).toBeInTheDocument();
  });
});
