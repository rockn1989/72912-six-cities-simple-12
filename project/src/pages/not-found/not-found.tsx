import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import './not-found.css';

const NotFound = () => (
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
