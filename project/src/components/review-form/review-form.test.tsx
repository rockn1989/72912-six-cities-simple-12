import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { mockStore } from '../../utils/mock-store';
import ReviewForm from './review-form';
import HistoryRouter from '../history-route/history-route';
import { AuthorizationStatus, DEFAULT_CITY, SortType, Status } from '../../const';
import { createFakeOffers } from '../../utils/mocks';

describe('Component: ReviewForm', () => {
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

  const SendCommentComponentWithProvider = (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <ReviewForm />
      </HistoryRouter>
    </Provider>
  );

  it('should render correctly', () => {
    render(SendCommentComponentWithProvider);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(
      screen.getByText(/To submit review please make sure to set/i)
    ).toBeInTheDocument();
  });

});
