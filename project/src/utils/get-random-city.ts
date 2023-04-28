export const getRandomCity = (cities: string[]): string => {
  const randomValue = Math.floor(Math.random() * cities.length);
  return cities[randomValue];
};
