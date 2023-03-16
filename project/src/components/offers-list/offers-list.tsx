import { FC, useState } from 'react';
import { Offer } from '../../types/offers';
import Card from '../card/card';

type OffersListProps = {
  offers: Offer[];
};

const OffersList:FC<OffersListProps> = ({offers}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className='cities__places-list places__list tabs__content'>
      {offers.map(({id, isPremium, previewImage, price, rating, type, title}) => (
        <Card
          key={id}
          id={id}
          isPremium={isPremium}
          previewImage={previewImage}
          price={price}
          rating={rating}
          type={type}
          title={title}
          onMouseOver={() => setActiveCard(id)}
        />
      ))}
    </div>
  );
};
export default OffersList;
