import React from 'react';
import { FC } from 'react';
import { useAppSelector } from '../../hooks';
import { getSortType } from '../../store/filter/selectors';
import { Offer } from '../../types/offers';
import { sortOffers } from '../../utils/sort-offers-by-type';
import Card from '../card/card';

type OffersListProps = {
  offers: Offer[];
  handleCardMouseOver?: (id: number) => void;
};

const OffersList:FC<OffersListProps> = ({offers, handleCardMouseOver}) => {

  const sortType = useAppSelector(getSortType);
  const sortedOffers = sortOffers(offers, sortType);

  const cards = sortedOffers && sortedOffers.map(({id, isPremium, previewImage, price, rating, type, title, city}) => (
    <Card
      key={id}
      id={id}
      isPremium={isPremium}
      previewImage={previewImage}
      price={price}
      rating={rating}
      type={type}
      title={title}
      city={city}
      onMouseOver={() => handleCardMouseOver && handleCardMouseOver(id)}
    />
  ));

  return (<div className='cities__places-list places__list tabs__content' data-testid='places-list'>{cards}</div>);
};
export default React.memo(OffersList);
