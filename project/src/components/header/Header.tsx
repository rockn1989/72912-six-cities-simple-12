import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/api-actions';
import Logo from '../logo/logo';

const Header:FC = () => {
  const auth = useAppSelector((state) => state.user.authorizationStatus);
  const userData = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();

  const handleLogOut = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logout());
  };

  return (
    <header className='header'>
      <div className='container'>
        {auth !== AuthorizationStatus.Auth ? (
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div className='header__wrapper'>
            <div className='header__left'>
              <Logo />
            </div>
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <div className='header__nav-profile'>
                    <div className='header__avatar-wrapper user__avatar-wrapper'>
                      <img src={userData?.avatarUrl} alt={userData?.name} />
                    </div>
                    <span className='header__user-name user__name'>{userData?.email}</span>
                  </div>
                </li>
                <li className='header__nav-item'>
                  <Link className='header__nav-link' to='/' onClick={handleLogOut}>
                    <span className='header__signout'>Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;
