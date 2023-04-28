import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import './not-found.css';

const NotFound = () => (
  <div className='page page--gray'>
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
        </div>
      </div>
    </header>
    <div className='not-found container'>
      <h1 className='not-found__title'>Page not found</h1>
      <Link to="/" className='not-found__link'>
        Перейти на главную
      </Link>
    </div>
  </div>
);


export default NotFound;
