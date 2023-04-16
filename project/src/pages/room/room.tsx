import { FC, useEffect, useState } from 'react';
import Form from '../../components/review-form/comment-form';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import ReviewPost from '../../components/review-post/review';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffer } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus, MAX_PHOTO_COUNT, MAX_REVIEWS_COUNT, Status } from '../../const';
import { Spinner } from '../../components/spinner/spinner';
import { setRating } from '../../utils/set-rating';
import OffersList from '../../components/offers-list/offers-list';
import { Offer } from '../../types/offers';
import { sortReviewsByDate } from '../../utils/sortReviewsByDate';

const Room:FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [activeOffer, setActiveOffer] = useState<Offer | undefined>(undefined);
  const {authorizationStatus} = useAppSelector((state) => state.user);
  const {offerById, offersNearby, reviews, status} = useAppSelector((state) => state.offer);

  const lastReviews = reviews.slice().sort(sortReviewsByDate).slice(0, MAX_REVIEWS_COUNT);

  const handleMouseOver = (offerId: number) => {
    const currentOffer = offersNearby && offersNearby.find((offer) => offer.id === offerId);
    setActiveOffer(currentOffer);
  };


  useEffect(() => {
    let isMounted = true;

    if (isMounted && id) {
      dispatch(fetchOffer(parseInt(id, 10)));
    }

    return () => {
      isMounted = false;
    };

  }, [dispatch, id]);

  if ( status === Status.LOADING) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <main className='page__main page__main--property'>
        <section className='property'>
          <div className='property__gallery-container container'>
            <div className='property__gallery'>
              {offerById && offerById.images.slice(0, MAX_PHOTO_COUNT).map((image) => (
                <div className='property__image-wrapper' key={image}>
                  <img className='property__image' src={image} alt='studio' />
                </div>
              ))}
            </div>
          </div>
          <div className='property__container container'>
            <div className='property__wrapper'>
              {offerById && offerById.isPremium && (
                <div className='property__mark'>
                  <span>Premium</span>
                </div>
              )}
              <div className='property__name-wrapper'>
                <h1 className='property__name'>
                  {offerById && offerById.title}
                </h1>
              </div>
              <div className='property__rating rating'>
                <div className='property__stars rating__stars'>
                  <span style={{width: offerById && setRating(offerById.rating)}}></span>
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='property__rating-value rating__value'>{offerById && offerById.rating}</span>
              </div>
              <ul className='property__features'>
                <li className='property__feature property__feature--entire'>
                  {offerById && offerById.type}
                </li>
                <li className='property__feature property__feature--bedrooms'>
                  {offerById && offerById.bedrooms} Bedrooms
                </li>
                <li className='property__feature property__feature--adults'>
                  Max {offerById && offerById.maxAdults} adults
                </li>
              </ul>
              <div className='property__price'>
                <b className='property__price-value'>&euro;{offerById && offerById.price}</b>
                <span className='property__price-text'>&nbsp;night</span>
              </div>
              <div className='property__inside'>
                <h2 className='property__inside-title'>What&apos;s inside</h2>
                <ul className='property__inside-list'>
                  {offerById && offerById.goods.map((good) => (
                    <li className='property__inside-item' key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='property__host'>
                <h2 className='property__host-title'>Meet the host</h2>
                <div className='property__host-user user'>
                  <div className={`property__avatar-wrapper ${offerById?.host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className='property__avatar user__avatar' src={offerById?.host.avatarUrl} width='74' height='74' alt={offerById?.host.name} />
                  </div>
                  <span className='property__user-name'>
                    {offerById && offerById.host.name}
                  </span>
                  {offerById && offerById.host.isPro && (
                    <span className='property__user-status'>
                      Pro
                    </span>
                  )}

                </div>
                <div className='property__description'>
                  <p className='property__text'>
                    {offerById && offerById.description}
                  </p>
                </div>
              </div>
              <section className='property__reviews reviews'>
                <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{lastReviews && lastReviews.length}</span></h2>
                <ul className='reviews__list'>
                  {lastReviews && lastReviews.map(({date, rating, comment, user}) => <ReviewPost key={`${date}-${user.name}`} date={date} rating={rating} comment={comment} user={user} />)}
                </ul>
                {authorizationStatus === AuthorizationStatus.Auth && <Form />}
              </section>
            </div>
          </div>
          <section className='property__map map'>
            <Map offers={offerById && [...offersNearby, offerById]} selectedOffer={activeOffer} />
          </section>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <div className='near-places__list places__list'>
              {offersNearby.length > 0 ? (
                <OffersList offers={offersNearby} handleMouseOver={handleMouseOver} />
              ) : (
                <p>Sorry, no places found nearby</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};


export default Room;
