/* eslint-disable no-console */
import React, { FC, useEffect, useState } from 'react';
import { FormSettings, RadioTitle } from '../../const';
import RatingButton from '../rating-button/rating-button';

type FormProps = {
  rating: number;
  review: string;
  isActive: boolean;
}

const Form:FC = () => {
  const [formData, setFormData] = useState<FormProps>({
    rating: 0,
    review: '',
    isActive: false,
  });

  useEffect(() => {
    if (formData.rating !== 0 && (formData.review.length >= FormSettings.MinValueLength && formData.review.length <= FormSettings.MaxValueLength)) {
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

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {new Array(FormSettings.RadioCount).fill('').map((_, index) => <RatingButton key={RadioTitle[index]} index={FormSettings.RadioCount - index} handleInputCheck={handleInputCheck} />)}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={formData.review} onChange={handleTextAreaChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!formData.isActive}>Submit</button>
      </div>
    </form>
  );
};

export default Form;
