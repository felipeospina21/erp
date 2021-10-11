export function thousandSeparator(num, decimals) {
  const formatedNum = num.toFixed(decimals);
  return formatedNum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
