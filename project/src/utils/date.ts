export const dateAdapter = (dateValue:string):string => {
  const date = new Date(dateValue).toLocaleString('en-EN', {'year': 'numeric', 'month': 'long'});
  return date;
};
