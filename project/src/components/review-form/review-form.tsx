import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormSetting, RatingTitle } from '../../const';
import { useAppDispatch } from '../../hooks';
import { sendReview } from '../../store/api-actions';
import RatingButton from '../rating-button/rating-button';

type ReviewFormProps = {
  rating: number;
  review: string;
  isActive: boolean;
}

const ReviewForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<ReviewFormProps>({
    rating: 0,
    review: '',
    isActive: false,
  });

  const handleInputCheck = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      rating: parseInt(evt.target.value, 10)
    });
  };

  const handleTextAreaChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      review: evt.target.value
    });
  };

  const sendReviewData = async () => {
    if( id ) {
      await dispatch(sendReview({
        offerId: parseInt(id, 10),
        comment: formData.review,
        rating: formData.rating
      }));
    }
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    sendReviewData();
  };

  const radioButtons = new Array(FormSetting.RadioCount).fill('').map((_, index) => <RatingButton key={RatingTitle[index]} index={FormSetting.RadioCount - index} handleInputCheck={handleInputCheck} />);

  useEffect(() => {
    if (formData.rating !== 0 && (formData.review.length >= FormSetting.MinValueLength && formData.review.length <= FormSetting.MaxValueLength)) {
      setFormData((oldFormData) => ({
        ...oldFormData,
        isActive: true
      }));
    } else {
      setFormData((oldFormData) => ({
        ...oldFormData,
        isActive: false
      }));
    }
  }, [formData.rating, formData.review]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit} data-testid='review-form'>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {radioButtons}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={formData.review} onChange={handleTextAreaChange} data-testid='review-id'></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!formData.isActive} data-testid='review-button'>Submit</button>
      </div>
    </form>
  );
};

export default ReviewForm;
