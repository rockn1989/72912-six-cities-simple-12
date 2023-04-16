import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getSelectedCity = (state: State) => state[NameSpace.Filter].city;
export const getSortType = (state: State) => state[NameSpace.Filter].sortType;
