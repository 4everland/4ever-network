import contracts from "@/contracts";
import { BigNumber } from "ethers";
import vm from "@/main.js";

export async function getBalance(account) {
  const balance = await contracts.Token.balanceOf(account);
  console.log("balance", balance);
  return balance.div((1e18).toString());
}

export async function getMyStake(account) {
  const candidate = await contracts.Stake.candidateInfo(account);
  console.log("stake", candidate);
  const amount = candidate.amount;
  const locked = candidate.locked;
  const slash = candidate.slash;
  const total = amount.add(locked).add(slash);
  return total;
}

export async function getMyApplyStakeInfo(account) {
  const candidateApply = await contracts.Stake.candidateApplyInfo(account);
  return candidateApply.amount;
}

export async function getMyReward(account) {
  const reward = await contracts.Stake.pendingReward(account);
  return reward.div((1e16).toString()) / 100;
}

export async function getStakeApproved(account) {
  const balance = await contracts.Token.balanceOf(account);
  const allowance = await contracts.Token.allowance(
    account,
    contracts.Stake.address
  );
  const isStakeApproved = allowance.gt(balance) && allowance.gt(0);
  console.log("allowance", allowance);
  console.log("isStakeApproved", isStakeApproved);

  return isStakeApproved;
}

export async function getVoteApproved(account) {
  const balance = await contracts.Token.balanceOf(account);
  const allowance = await contracts.Token.allowance(
    account,
    contracts.Election.address
  );
  const isVoteApproved = allowance.gt(balance) && allowance.gt(0);
  console.log("allowance", allowance);
  console.log("isVoteApproved", isVoteApproved);
  return isVoteApproved;
}

export async function stakeApprove() {
  const uint256Max = BigNumber.from("1").shl(256).sub(1);
  const tx = await contracts.Token.approve(contracts.Stake.address, uint256Max);
  console.log(tx);
  const receipt = await tx.wait();
  console.log(receipt);
  return receipt;
}

export async function voteApprove() {
  const uint256Max = BigNumber.from("1").shl(256).sub(1);
  try {
    const tx = await contracts.Token.approve(
      contracts.Election.address,
      uint256Max
    );
    console.log(tx);
    const receipt = await tx.wait();
    console.log(receipt);
    return receipt;
  } catch (error) {
    console.log(error);
  }
}

export async function stake(account, amount) {
  const minStake = await contracts.Stake.minStake();
  const alreadyStaked = await contracts.Stake.candidateInfo(account);
  console.log(alreadyStaked.amount.toString(), minStake.toString());
  console.log("amount", amount);
  if (amount.lt(minStake.sub(alreadyStaked.amount))) {
    vm.$dialog.notify.error("小于最小质押(需要文案)", {
      position: "top-right",
      timeout: 5000,
    });
    return false;
  }
  try {
    const tx = await contracts.Stake.stake(amount);
    console.log(tx);
    const receipt = await tx.wait();
    console.log(receipt);
    return receipt;
  } catch (error) {
    console.log(error);
    vm.$dialog.notify.error(error.data.message, {
      position: "top-right",
      timeout: 5000,
    });
    return error;
  }
}

// export async function handlerUnstake() {
//   const isStakeUnfrozen = await contracts.Stake.isStakeUnfrozen(this.account);
//   console.log(isStakeUnfrozen);
//   try {
//     const tx = await contracts.Stake.quit(this.account);
//     console.log(tx);
//     const receipt = await tx.wait();
//     console.log(receipt);
//   } catch (error) {
//     console.log(error);
//     vm.$dialog.notify.error(error.data.message, {
//       position: "top-right",
//       timeout: 5000,
//     });
//     return error;
//   }
// }
