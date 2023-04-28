import { FormEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute, Cities, PASSWORD_REG_EXP } from '../../const';
import { useAppDispatch } from '../../hooks';
import { login } from '../../store/api-actions';
import { filterOffers } from '../../store/filter/filter';
import { AuthData } from '../../types/auth-data';
import { getRandomCity } from '../../utils/get-random-city';

const Login = () => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const randomCity = getRandomCity(Cities);

  const onSubmit = (authData: AuthData) => {
    dispatch(login(authData));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });

      navigate(AppRoute.Root);
    }
  };

  const handleInputPasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    let validityMessage = '';

    if (!PASSWORD_REG_EXP.test(target.value)) {
      validityMessage = 'Please enter at least one letter and one digit';
    }

    target.setCustomValidity(validityMessage);
    target.reportValidity();
  };

  return (
    <div className='page page--gray page--login'>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>
      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <form className='login__form form' action='#' method='post' onSubmit={handleFormSubmit} data-testid='signin-form'>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden' htmlFor="emailId">E-mail</label>
                <input className='login__input form__input' id="emailId" type='email' name='email' placeholder='Email' required ref={loginRef} data-testid="email" />
              </div>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden' htmlFor="passwordId">Password</label>
                <input className='login__input form__input' id="passwordId" type='password' name='password' placeholder='Password' required ref={passwordRef} data-testid="password" onChange={(evt) => {
                  handleInputPasswordChange(evt);
                }}
                />
              </div>
              <button className='login__submit form__submit button' type='submit' data-testid="signin-button">Sign in</button>
            </form>
          </section>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <Link className='locations__item-link'
                to='/'
                onClick={() => {
                  dispatch(filterOffers(randomCity));
                }}
              >
                <span>{ randomCity }</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};


export default Login;
