import React from 'react';
import { FC } from 'react';
import { Review } from '../../types/reviews';
import ReviewPost from '../review-post/review-post';

type ReviewsListProps = {
  reviews: Review[];
}

const ReviewsList:FC<ReviewsListProps> = ({reviews}) => {
  const reviewsList = reviews.map(({id, date, rating, comment, user}) => (
    <ReviewPost
      key={`${id}-${user.name}`}
      date={date}
      rating={rating}
      comment={comment}
      user={user}
    />
  ));

  return (
    <ul className='reviews__list'>
      {reviewsList}
    </ul>
  );
};

export default React.memo(ReviewsList);
