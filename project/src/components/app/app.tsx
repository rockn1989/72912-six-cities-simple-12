import { FC } from 'react';
import Main from '../../pages/main/main';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import { AppRoute } from '../../const';
import { Review } from '../../types/reviews';
import { Offer } from '../../types/offers';

type AppProps = {
  cardsCount: number;
  offers: Offer[];
  reviews: Review[];
};

const App:FC<AppProps> = ({cardsCount, offers, reviews}) => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<Main cardsCount={cardsCount} offers={offers} />}
      />
      <Route
        path={AppRoute.Login}
        element={<Login />}
      />
      <Route
        path={`${AppRoute.Offer}/:id`}
        element={<Room reviews={reviews} />}
      />

      <Route
        path='*'
        element={<NotFound />}
      />
    </Routes>
  </BrowserRouter>

);

export default App;
