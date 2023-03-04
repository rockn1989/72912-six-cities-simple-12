import { FC } from 'react';
import Main from '../../pages/main/main';

type AppProps = {
  cardsCount: number;
};

const App:FC<AppProps> = ({cardsCount}) => (
  <Main cardsCount={cardsCount} />
);

export default App;
