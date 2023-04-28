import { fetchOffers, fetchOfferNearby, fetchOffer, fetchReview, sendReview, checkAuth, login } from './api-actions';
import { ApiSettings} from '../const';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
import { createFakeOffers, createFakeReviews, createFakeOffer } from '../utils/mocks';
import { mockAPI, mockStore } from '../utils/mock-store';

describe('Async actions', () => {

  it('should authorization status is auth when server return 200', async () => {
    const store = mockStore();

    mockAPI
      .onGet(ApiSettings.LOGIN_URL)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuth());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuth.pending.type,
      checkAuth.fulfilled.type
    ]);
  });

  it('should dispatch RequiredAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(ApiSettings.LOGIN_URL)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(login(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      login.pending.type,
      redirectToRoute.type,
      login.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-sities-token', 'secret');
  });

  it('should dispatch fetchOffers when GET /hotel', async () => {
    const store = mockStore();
    const mockOfferData = createFakeOffers(5);

    mockAPI
      .onGet(ApiSettings.OFFERS_URL)
      .reply(200, mockOfferData);

    await store.dispatch(fetchOffers());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffers.pending.type,
      fetchOffers.fulfilled.type
    ]);
  });

  it('should dispatch fetchOfferNearby when GET /nearby', async () => {
    const store = mockStore();
    const mockOfferData = createFakeOffers(5);

    mockAPI
      .onGet(ApiSettings.OFFERS_URL)
      .reply(200, mockOfferData);

    await store.dispatch(fetchOfferNearby(3));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferNearby.pending.type,
      fetchOfferNearby.fulfilled.type
    ]);
  });

  it('should dispatch fetchReview when GET /comments/:id', async () => {
    const store = mockStore();
    const mockReviewsData = createFakeReviews(5);

    mockAPI
      .onGet(`${ApiSettings.COMMENTS_URL}/3`)
      .reply(200, mockReviewsData);

    await store.dispatch(fetchReview(3));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReview.pending.type,
      fetchReview.fulfilled.type
    ]);
  });

  it('should dispatch fetchOffer when GET /hotels/:id', async () => {
    const store = mockStore();
    const mockOfferData = createFakeOffer();

    mockAPI
      .onGet(`${ApiSettings.COMMENTS_URL}/3`)
      .reply(200, mockOfferData);

    await store.dispatch(fetchOffer(3));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffer.pending.type,
      redirectToRoute.type,
      fetchOffer.fulfilled.type
    ]);
  });

  it('should dispatch sendReview when POST /comments/:id', async () => {
    const store = mockStore();
    const fakeReview = {offerId: 3, comment: 'text', rating: 5};
    const mockFakeReviews = createFakeReviews(5);

    mockAPI
      .onPost(`${ApiSettings.COMMENTS_URL}/3`)
      .reply(200, mockFakeReviews);

    await store.dispatch(sendReview(fakeReview));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendReview.pending.type,
      sendReview.fulfilled.type
    ]);
  });

});

