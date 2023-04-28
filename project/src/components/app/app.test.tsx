import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { Provider } from 'react-redux';
import { AuthorizationStatus, AppRoute, DEFAULT_CITY, SortType, Status } from '../../const';
import App from './app';

const mockStore = configureMockStore();

const store = mockStore({
  OFFER: {
    offers: [],
    offersNearby: [],
    offerById: undefined,
    reviews: [],
    status: Status.Loading
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

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render \'Main\' when user navigate to \'/\'', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
    expect(screen.getByText('Cities')).toBeInTheDocument();
  });

  it('should render \'Login\' when user navigate to \'/login\'', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    const divElements = screen.getAllByText('Sign in');
    expect(divElements.length).toBe(2);

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render \'NotFound\' when user navigate to non-existent route', () => {
    history.push('/non-exist-route');

    render(fakeApp);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Перейти на главную')).toBeInTheDocument();
  });
});
