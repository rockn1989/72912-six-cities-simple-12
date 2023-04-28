import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';
import { setRating } from '../../utils/set-rating';

type CardProps = Omit<Offer, 'images' | 'bedrooms' | 'maxAdults' | 'goods' | 'host' | 'location' | 'description'> & {
  onMouseOver: (id: number) => void;
}

const Card:FC<CardProps> = ({id, isPremium, previewImage, price, rating, type, title, onMouseOver}) => (
  <article data-testid="place-card-container" className='cities__card place-card' onMouseOver={() => onMouseOver(id)}>
    {isPremium && (
      <div className='place-card__mark'>
        <span>Premium</span>
      </div>
    )}
    <div className='cities__image-wrapper place-card__image-wrapper'>
      <Link to={`/offer/${id}`}>
        {previewImage ? (
          <img className='place-card__image' src={previewImage} width='260' height='200' alt={title} />
        ) : (
          <img className='place-card__image' src="https://joadre.com/wp-content/uploads/2019/02/no-image.jpg" width='260' height='200' alt={title} />
        )}
      </Link>
    </div>
    <div className='place-card__info'>
      <div className='place-card__price-wrapper'>
        <div className='place-card__price'>
          <b className='place-card__price-value' data-testid='place-card-price'>&euro; {price}</b>
          <span className='place-card__price-text'>&#47;&nbsp;night</span>
        </div>

      </div>
      <div className='place-card__rating rating'>
        <div className='place-card__stars rating__stars'>
          <span style={{ width: setRating(rating) }}></span>
          <span className='visually-hidden'>Rating</span>
        </div>
      </div>
      <h2 className='place-card__name'>
        <Link to={`/offer/${id}`} data-testid='place-card-title'>{title}</Link>
      </h2>
      <p className='place-card__type'>{type}</p>
    </div>
  </article>
);


export default Card;
