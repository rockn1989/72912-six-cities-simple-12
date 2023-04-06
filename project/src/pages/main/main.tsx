import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import Sort from '../../components/sort/sort';
import CitiesList from '../../components/cities-list/cities-list';
import { Cities } from '../../mocks/cities';
import { filterOffers } from '../../store/filter/filter';
import { Offer } from '../../types/offers';
import MainEmpty from '../main-empty/main-empty';
import { Spinner } from '../../components/Spinner/spinner';

const Main:FC = () => {

  const [activeOffer, setActiveOffer] = useState<Offer | undefined>(undefined);


  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.offer.status);
  const offersAll = useAppSelector((state) => state.offer.offers);
  const offersByCity = useAppSelector((state) => state.filter.offersByCity);
  const selectedCity = useAppSelector((state) => state.filter.city);

  const handleMouseOver = (id: number) => {
    const currentOffer = offersAll && offersAll.find((offer) => offer.id === id);
    setActiveOffer(currentOffer);
  };

  useEffect(() => {
    dispatch(filterOffers({
      offers: offersAll,
      city: selectedCity
    }));

  }, [dispatch, offersAll, selectedCity]);

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
