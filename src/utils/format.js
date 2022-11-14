/**
 * 1000000 to 1,000,000
 * @param {Number|String} num
 * @returns {String}
 */
export function formart_number(num) {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
