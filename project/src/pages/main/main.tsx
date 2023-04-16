import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import Sort from '../../components/sort/sort';
import CitiesList from '../../components/cities-list/cities-list';
import { Cities } from '../../mocks/cities';
import { Offer } from '../../types/offers';
import MainEmpty from '../main-empty/main-empty';
import { Spinner } from '../../components/spinner/spinner';
import { getOffersByCity, getOffersAll, getStatus } from '../../store/offer/selectors';
import { getSelectedCity } from '../../store/filter/selectors';

const Main = () => {

  const [activeOffer, setActiveOffer] = useState<Offer | undefined>(undefined);

  const status = useAppSelector(getStatus);
  const offersAll = useAppSelector(getOffersAll);
  const offersByCity = useAppSelector(getOffersByCity);
  const selectedCity = useAppSelector(getSelectedCity);

  const handleMouseOver = (id: number) => {
    const currentOffer = offersAll && offersAll.find((offer) => offer.id === id);
    setActiveOffer(currentOffer);
  };

  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className={`page__main page__main--index ${(status === 'error' || offersByCity.length === 0) ? 'page__main--index-empty' : ''}`}>
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <CitiesList cities={Cities} />
        </div>
        <div className='cities'>

          {status === 'loading' && (
            <Spinner />
          )}

          {status === 'success' && (
            <div className='cities__places-container container'>

              <section className='cities__places places'>
                <h2 className='visually-hidden'>Places</h2>

                <b className='places__found'>{offersByCity.length} places to stay in {selectedCity}</b>
                <Sort />
                <OffersList offers={offersByCity} handleMouseOver={handleMouseOver} />

              </section>
              <div className='cities__right-section'>
                <Map offers={offersByCity} selectedOffer={activeOffer} />
              </div>

            </div>
          )}

          {(status === 'error' || ( status === 'success' && offersByCity.length === 0)) && (
            <MainEmpty />
          )}
        </div>
      </main>
    </div>
  );
};


export default Main;
