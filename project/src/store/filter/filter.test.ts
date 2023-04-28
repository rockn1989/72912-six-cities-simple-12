import filterSlice, {filterOffers, sortOffers} from './filter';


describe('Reducer: Filter', () => {

  const state = {city: 'Paris', sortType: 'Popular'};
  it('without additional parameters should return initial state', () => {
    expect(filterSlice(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('add additional parameters should return new filter state: city', () => {
    expect(filterSlice(state, filterOffers('Amsterdam')))
      .toEqual({city: 'Amsterdam', sortType: 'Popular'});
  });

  it('add additional parameters should return new filter state: sort', () => {
    expect(filterSlice(state, sortOffers('Top rated first')))
      .toEqual({city: 'Paris', sortType: 'Top rated first'});
  });

  it('with wrong additional parameters should return current state', () => {
    expect(filterSlice(state, {type: 'UNKNOWN_ACTION'}))
      .toEqual({city: 'Paris', sortType: 'Popular'});
  });
});
