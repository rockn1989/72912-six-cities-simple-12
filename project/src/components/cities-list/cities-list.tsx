import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterOffers, selectCity } from '../../store/action';

type CitiesListProps = {
  cities: string[];
}

const CitiesList:FC<CitiesListProps> = ({cities}) => {
  const selectedCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const citiesList = cities.map((city) => (
    <li key={city} className="locations__item">
      <Link className={selectedCity === city ?
        'locations__item-link tabs__item tabs__item--active' :
        'locations__item-link tabs__item'}
      to='/'
      onClick={() => {
        dispatch(selectCity(city));
        dispatch(filterOffers());
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

export default CitiesList;
