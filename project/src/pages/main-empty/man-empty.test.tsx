import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { DEFAULT_CITY } from '../../const';
import { mockStore } from '../../utils/mock-store';
import MainEmpty from './main-empty';

describe('Component: MainEmpty', () => {
  const mockCity = DEFAULT_CITY;

  const store = mockStore({ FILTER: {city: mockCity} });

  const MainComponentWithProvider = (
    <Provider store={store}>
      <MainEmpty />
    </Provider>
  );

  it('should render correctly', () => {
    render(MainComponentWithProvider);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
