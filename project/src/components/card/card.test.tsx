import { Provider } from 'react-redux';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import Card from './card';
import Room from '../../pages/room/room';
import { createFakeOffer } from '../../utils/mocks';
import { mockStore } from '../../utils/mock-store';
import { AuthorizationStatus, DEFAULT_CITY, SortType, Status } from '../../const';

describe('Component: Card', () => {
  const listItemHoverFn = jest.fn();
  const mockOffer = createFakeOffer();

  const history = createMemoryHistory();

  const PlaceCardWithHistoryRouter = (
    <HistoryRouter history={history}>
      <Card
        key={mockOffer.id}
        id={mockOffer.id}
        isPremium={mockOffer.isPremium}
        previewImage={mockOffer.previewImage}
        price={mockOffer.price}
        rating={mockOffer.rating}
        type={mockOffer.type}
        title={mockOffer.title}
        city={mockOffer.city}
        onMouseOver={listItemHoverFn}
      />
    </HistoryRouter>
  );

  it('should render the offer\'s details properly', () => {
    render(PlaceCardWithHistoryRouter);

    expect(screen.getByTestId('place-card-title').textContent).toEqual(mockOffer.title);
    expect(screen.getByTestId('place-card-price')).toHaveTextContent(`${mockOffer.price}`);
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  it('when component is hovered, onListItemHover is called with the offer id', () => {
    render(PlaceCardWithHistoryRouter);

    fireEvent.mouseEnter(screen.getByTestId('place-card-container'));

    expect(listItemHoverFn).toBeCalled();
    expect(listItemHoverFn).nthCalledWith(1, mockOffer.id);
  });

  it('When title is clicked, redirect to Offer', async () => {
    const listItemHoverfn = jest.fn();

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

    history.push('/');

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path='/' element={
              <Card
                key={mockOffer.id}
                id={mockOffer.id}
                isPremium={mockOffer.isPremium}
                previewImage={mockOffer.previewImage}
                price={mockOffer.price}
                rating={mockOffer.rating}
                type={mockOffer.type}
                title={mockOffer.title}
                city={mockOffer.city}
                onMouseOver={listItemHoverfn}
              />
            }
            />
            <Route path='/offer/:id' element={<Room />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();

    await act(async () => await userEvent.click(screen.getByText(mockOffer.title)));

    await waitFor(() => {
      expect(history.location.pathname).toBe(`/offer/${mockOffer.id}`);
    });

    const actions = store.getActions();
    expect(actions[0].type).toBe('offer/fetchOfferByIdData/pending');
  });
});
