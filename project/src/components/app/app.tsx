import { Routes, Route } from 'react-router-dom';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import Main from '../../pages/main/main';

import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import { AppRoute } from '../../const';

const App = () => (
  <HistoryRouter history={browserHistory}>
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<Main />}
      />
      <Route
        path={AppRoute.Login}
        element={<Login />}
      />
      <Route
        path={`${AppRoute.Offer}/:id`}
        element={<Room />}
      />

      <Route
        path='*'
        element={<NotFound />}
      />
    </Routes>
  </HistoryRouter>

);

export default App;
