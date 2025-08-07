export const formatDate = (unixTime) => {
  const date = new Date(unixTime * 1000);
  return date.toLocaleString();
};
