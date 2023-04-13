import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormSettings, RadioTitle } from '../../const';
import { useAppDispatch } from '../../hooks';
import { sendReview } from '../../store/api-actions';
import RatingButton from '../rating-button/rating-button';

type FormProps = {
  rating: number;
  review: string;
  isActive: boolean;
}

const Form:FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormProps>({
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

  const test = async () => {
    // eslint-disable-next-line no-console
    console.log(formData);
    if( id ) {
      await dispatch(sendReview({
        offerId: parseInt(id, 10),
        comment: formData.review,
        rating: formData.rating
      }));
    }
  };

  const handleSubmit = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    test();

  };

  const radioButtons = new Array(FormSettings.RadioCount).fill('').map((_, index) => <RatingButton key={RadioTitle[index]} index={FormSettings.RadioCount - index} handleInputCheck={handleInputCheck} />);

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

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {radioButtons}
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
