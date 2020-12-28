export const numberWithSeparator = (x, seperator = ' ') => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, seperator);
