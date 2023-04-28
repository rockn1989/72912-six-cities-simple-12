import { Review } from '../types/reviews';
import dayjs from 'dayjs';

export const sortReviewsByDate = (reviewA: Review, reviewB: Review) => dayjs(reviewB.date).diff(dayjs(reviewA.date));
