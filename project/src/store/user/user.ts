import { createSlice } from'@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { checkAuth, login, logout } from '../api-actions';
import { UserData } from '../../types/user-data';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkAuth.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
    builder.addCase(checkAuth.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    });

    builder.addCase(login.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userData = action.payload;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = null;
    });
  },
});

export default userSlice.reducer;
