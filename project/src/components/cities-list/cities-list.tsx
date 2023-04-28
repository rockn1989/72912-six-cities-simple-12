import React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterOffers } from '../../store/filter/filter';
import { getSelectedCity } from '../../store/filter/selectors';

type CitiesListProps = {
  cities: string[];
}

const CitiesList:FC<CitiesListProps> = ({cities}) => {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(getSelectedCity);

  const citiesList = cities.map((city) => (
    <li key={city} className="locations__item" data-testid="cities-list__item">
      <Link className={selectedCity === city ?
        'locations__item-link tabs__item tabs__item--active' :
        'locations__item-link tabs__item'}
      to='/'
      onClick={() => {
        dispatch(filterOffers(city));
      }}
      >
        <span>{city}</span>
      </Link>
    </li>
  ));

  return (
    <section className='locations container'>
      <ul className='locations__list tabs__list'>
        {citiesList}
      </ul>
    </section>
  );
};

export default React.memo(CitiesList);
