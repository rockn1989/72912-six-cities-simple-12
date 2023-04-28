import { useState } from 'react';
import { SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sortOffers } from '../../store/filter/filter';
import { getSortType } from '../../store/filter/selectors';

const Sort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSort = useAppSelector(getSortType);
  const dispatch = useAppDispatch();

  const handleOptionClick = (title: string) => {
    dispatch(sortOffers(title));
  };

  const sortList = Object.values(SortType).map((sortType) => (
    <li
      key={sortType}
      className={`places__option ${sortType === selectedSort ? 'places__option--active' : ''}`}
      tabIndex={0}
      onClick={() => handleOptionClick(sortType)}
    >{sortType}
    </li>
  ));

  return (
    <form className='places__sorting' action='#' method='get' onClick={() => setIsOpen(!isOpen)}>
      <span className='places__sorting-caption'>Sort by</span>
      <span className='places__sorting-type' tabIndex={0} data-testid='active-filter-option'> {selectedSort}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`} >
        {sortList}
      </ul>
    </form>
  );
};

export default Sort;
