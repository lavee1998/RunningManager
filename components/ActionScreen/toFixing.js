export default (num, dec) => {
  const decimal = Math.pow(10, dec);
  return Math.floor(num * decimal) / decimal;
};
