import { render, screen } from '@testing-library/react';
import Sort from './sort';
import { Provider } from 'react-redux';
import { mockStore } from '../../utils/mock-store';
import { AuthorizationStatus, DEFAULT_CITY, SortType, Status } from '../../const';

describe('OptionsList component', () => {

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
        authorizationStatus: AuthorizationStatus.Auth,
      },
    }
  );

  const OptionsListWithProvider = (
    <Provider store={store}>
      <Sort />
    </Provider>
  );

  it('should display active filter options', () => {
    render(OptionsListWithProvider);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTestId('active-filter-option').textContent?.trim()).toEqual(SortType.Popular);
  });
});
