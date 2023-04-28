
import React, { FC, Fragment } from 'react';
import { FormSetting, RatingTitle } from '../../const';

type RatingButtonProps = {
  index: number;
  handleInputCheck: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const RatingButton:FC<RatingButtonProps> = ({index, handleInputCheck}) => (
  <Fragment key={RatingTitle[FormSetting.RadioCount - index]}>
    <input className="form__rating-input visually-hidden" name="rating" value={index} id={`${index}-stars`} type="radio" onChange={handleInputCheck} data-testid='rating-id'/>
    <label htmlFor={`${index}-stars`} className="reviews__rating-label form__rating-label" title={RatingTitle[index - 1]}>
      <svg className="form__star-image" width="37" height="33">
        <use xlinkHref="#icon-star"></use>
      </svg>
    </label>
  </Fragment>
);

export default RatingButton;
