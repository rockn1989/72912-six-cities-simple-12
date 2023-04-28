import { render, screen, within } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { createFakeReviews } from '../../utils/mocks';

describe('Component: ReviewsList', () => {
  const mockComments = createFakeReviews(5);
  it('should render comments correctly', () => {
    render(<ReviewsList reviews={mockComments} />);

    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');

    expect(items.length).toEqual(mockComments.length);
  });
});
