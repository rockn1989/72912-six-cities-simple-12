import { FC } from 'react';
import { Offer } from '../../types/offers';
import Card from '../card/card';

type OffersListProps = {
  offers: Offer[];
  handleMouseOver: (id: number) => void;
};

const OffersList:FC<OffersListProps> = ({offers, handleMouseOver}) => {

  const cards = offers.map(({id, isPremium, previewImage, price, rating, type, title, city}) => (
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
      onMouseOver={() => handleMouseOver(id)}
    />
  ));

  return (<div className='cities__places-list places__list tabs__content'>{cards}</div>);
};
export default OffersList;
