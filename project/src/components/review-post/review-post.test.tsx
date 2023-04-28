import { render, screen } from '@testing-library/react';
import { createFakeReview } from '../../utils/mocks';
import ReviewPost from './review-post';

describe('Component:  ReviewPost', () => {
  it('should render correctly', () => {
    const mockReview = createFakeReview();

    render(<ReviewPost {...mockReview} />);

    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
  });
});
