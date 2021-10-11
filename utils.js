export function thousandSeparator(num) {
  const formatedNum = num.toFixed(2);
  return formatedNum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
