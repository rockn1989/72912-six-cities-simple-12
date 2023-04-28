import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from '../../utils/mock-store';
import CitiesList from './cities-list';
import { AuthorizationStatus, Cities, DEFAULT_CITY, SortType, Status } from '../../const';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';

describe('Component: CitiesList', () => {
  it ('should display a list of cities from the props', () => {

    const store = mockStore( {
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
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesList cities={Cities} />
        </HistoryRouter>
      </Provider>
    );

    const cityItems = screen.getAllByTestId('cities-list__item');
    expect(cityItems.length)
      .toBe(Cities.length);

    cityItems.forEach((cityItem, index) => {
      expect(cityItem.textContent)
        .toEqual(Cities[index]);
    });
  });
});
