
export const setRating = (rating: number):string => {
  const MIN_RATING = 0,
    MAX_RATING = 5;

  if (rating === MIN_RATING) {
    return `${MIN_RATING}%`;
  }

  const total = Math.round((rating / MAX_RATING) * 100);

  return `${total}%`;
};
