import { BigNumber } from "@ethersproject/bignumber";

export const formatToken = (value, fixed = 6, decimals = 18) => {
  const diff = decimals - fixed;
  let n;
  if (diff <= 18) {
    n = BigNumber.from((10 ** diff).toString());
  } else {
    const a = BigNumber.from((10 ** 18).toString());
    const c = diff - 18;
    const b = BigNumber.from((10 ** c).toString());
    n = a.mul(b);
  }
  const v = value.div(BigNumber.from(n));
  return (v.toNumber() / 10 ** fixed).toFixed(fixed);
};

export function formart_rewards(rewards) {
  rewards = BigNumber.from(rewards);
  const one = BigNumber.from((1e18).toString());
  const oneK = BigNumber.from((1e3).toString()).mul(one);
  const oneM = BigNumber.from((1e6).toString()).mul(one);
  const oneB = BigNumber.from((1e9).toString()).mul(one);
  if (rewards.lt(oneK)) {
    return formatToken(rewards, 2, 18);
  } else if (rewards.lt(oneM)) {
    return formatToken(rewards, 2, 21) + "K";
  } else if (rewards.lt(oneB)) {
    return formatToken(rewards, 2, 24) + "M";
  } else {
    return formatToken(rewards, 2, 27) + "B";
  }
}
export function formart_storage(value) {
  const num = 1024;
  if (value.length < 16 || typeof value == "number") {
    value = Number(value);
    if (value < num) return value + "B";
    if (value < Math.pow(num, 2)) return (value / num).toFixed(2) + "K";
    if (value < Math.pow(num, 3))
      return (value / Math.pow(num, 2)).toFixed(2) + "M";
    if (value < Math.pow(num, 4))
      return (value / Math.pow(num, 3)).toFixed(2) + "G";
    return (value / Math.pow(num, 4)).toFixed(2) + "T";
  } else {
    const storage = BigNumber.from(value);
    const scale = BigNumber.from(Math.pow(num, 3).toString());
    return storage.div(scale).toString() + "T";
  }
}
export function formart_date(time, cFormat) {
  const format = cFormat || "{m} {d} {y} {h}";
  if (typeof time === "number" && time.toString().length === 10) {
    time = time * 1000;
  }
  const date = new Date(time).toUTCString();
  const arr = date.split(" ");
  // return date.replace(/\w+\s/, '').replace(/\sGMT.*$/, '')
  const formatObj = {
    m: arr[2],
    d: arr[1],
    y: arr[3],
    h: arr[4],
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    return value;
  });
  return time_str;
  // return arr[2] + " " + arr[1] + ", " + arr[3] + " " + arr[4];
}

/**
 * 1000000 to 1,000,000
 * @param {Number|String} num
 * @returns {String}
 */
export function formart_number(num) {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function nFormatter(num, digits) {
  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export function bignumFormatter(num) {
  if (num > 999999999) {
    num = parseFloat(parseFloat(num / 1e10).toFixed(2));
    return formart_number(num) + "B";
  } else {
    return formart_number(parseFloat(parseFloat(num).toFixed(2)));
  }
}
