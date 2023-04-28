import { act, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory } from 'history';

import Login from './login';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { mockStore } from '../../utils/mock-store';


describe('Component: Login', () => {

  const store = mockStore();
  const history = createMemoryHistory();

  it('the values that the user fills in the fields should be displayed in the form fields', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>
    );

    await act(async () => await userEvent.type(screen.getByTestId('email'), 'test@gmail.com'));
    await act(async () => await userEvent.type(screen.getByTestId('password'), '123456d'));

    expect(screen.getByDisplayValue(/test@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456d/i)).toBeInTheDocument();
  });

  it('submit is not disabled when the fields are filled in correctly, submit dispatches loginAction', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>
    );

    await act(async () => await userEvent.type(screen.getByTestId('email'), 'test@gmail.com'));
    await act(async () => await userEvent.type(screen.getByTestId('password'), '123456d'));

    fireEvent.submit(screen.getByTestId('signin-form'));

    expect(screen.getByTestId('signin-button')).not.toBeDisabled();


    const actions = store.getActions();

    expect(actions[0].type).toBe('user/login/pending');
  });

});
