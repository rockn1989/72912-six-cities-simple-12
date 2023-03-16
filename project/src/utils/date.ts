export const dateAdapter = (dateValue:string):string => {
  const date = new Date(dateValue).toLocaleString('en-EN', {'day': 'numeric', 'month': 'long'});
  return date;
};
