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
export function formart_date(time) {
  const date = new Date(time * 1000).toString();
  return date.replace(/\w+\s/, "").replace(/\sGMT.*$/, "");
}
