
import React, { FC, Fragment } from 'react';
import { RadioTitle } from '../../const';

type RatingButtonProps = {
  index: number;
  handleInputCheck: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const RatingButton:FC<RatingButtonProps> = ({index, handleInputCheck}) => (
  <Fragment key={RadioTitle[5 - index]}>
    <input className="form__rating-input visually-hidden" name="rating" value={index} id={`${index}-stars`} type="radio" onChange={handleInputCheck} />
    <label htmlFor={`${index}-stars`} className="reviews__rating-label form__rating-label" title={RadioTitle[index]}>
      <svg className="form__star-image" width="37" height="33">
        <use xlinkHref="#icon-star"></use>
      </svg>
    </label>
  </Fragment>
);

export default RatingButton;
