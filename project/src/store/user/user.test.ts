import userSlice from './user';
import { AuthorizationStatus } from '../../const';
import { checkAuth, login, logout } from '../api-actions';
import { UserData } from '../../types/user-data';
import { createFakeUser } from '../../utils/mocks';

const mockUser: Omit<UserData, 'token'> = createFakeUser();

describe('Reducer: User', () => {
  let state: {
    authorizationStatus: AuthorizationStatus;
    userData: UserData | null;
  };

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userSlice(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown, userData: null});
  });

  describe('checkAuth test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuth action fulfilled', () => {
      expect(userSlice(state, { type: checkAuth.fulfilled.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, userData: null});
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuth action rejected', () => {
      expect(userSlice(state, { type: checkAuth.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: null});
    });
  });

  describe('login action test', () => {
    it('should update authorizationStatus to "AUTH" if login action fulfilled', () => {
      expect(userSlice(state, { type: login.fulfilled.type, payload: mockUser }))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, userData: mockUser});
    });

    it('should update authorizationStatus to "NO_AUTH" if login action rejected', () => {
      expect(userSlice(state, { type: login.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: null});
    });
  });


  describe('logout action test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logout action fulfilled', () => {
      expect(userSlice(state, { type: logout.fulfilled.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: null});
    });
  });

});
