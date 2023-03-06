import { FC } from 'react';
import Main from '../../pages/main/main';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import { AppRoute } from '../../const';

type AppProps = {
  cardsCount: number;
};

const App:FC<AppProps> = ({cardsCount}) => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<Main cardsCount={cardsCount} />}
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
  </BrowserRouter>

);

export default App;
