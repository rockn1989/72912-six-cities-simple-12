import { FC, useState } from 'react';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { Offer } from '../../types/offers';
import { Cities } from '../../mocks/cities';
import { useAppSelector } from '../../hooks';
import Sort from '../../components/sort/sort';

type MainProps = {
  offers: Offer[];
}

const Main:FC<MainProps> = ({offers}) => {

  const [activeCard, setActiveCard] = useState(0);
  const handleMouseOver = (id: number) => {
    setActiveCard(id);
  };

  const offersByCity = useAppSelector((state) => state.offersByCity);
  const selectedCity = useAppSelector((state) => state.city);

  const points = offersByCity.map((offer) => ({
    latitude: offer.city.location.latitude,
    longitude: offer.city.location.longitude,
    id: offer.id
  }));


  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className={`page__main page__main--index ${offersByCity.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <CitiesList cities={Cities} />
        </div>
        <div className='cities'>
          {offersByCity && offersByCity.length > 0 ? (
            <div className='cities__places-container container'>
              <section className='cities__places places'>
                <h2 className='visually-hidden'>Places</h2>
                <b className='places__found'>{offersByCity.length} places to stay in {selectedCity}</b>
                <Sort />
                <OffersList offers={offersByCity} handleMouseOver={handleMouseOver} />
              </section>
              <div className='cities__right-section'>
                <Map city={offersByCity[0].city} points={points} selectedCardId={activeCard} />
              </div>
            </div>
          ) : (
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};


export default Main;
