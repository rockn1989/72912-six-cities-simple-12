import { FC } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';

const NotFound:FC = () => (
  <>
    <Header />
    <div className='not-found container'>
      <h1 className='not-found__title'>Page not found</h1>
      <Link to="/" className='not-found__link'>
        Перейти на главную
      </Link>
    </div>
  </>
);


export default NotFound;
