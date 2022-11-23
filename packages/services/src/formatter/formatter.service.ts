const getFormattedPrice = (price?: number) => {
  return price && price.toLocaleString('en-IN');
};

export const formatterService = {
  getFormattedPrice,
};
