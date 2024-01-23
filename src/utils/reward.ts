// ethers
import { ethers } from "ethers";

// utils
import { node } from "~/utils/node";

export async function calculate_block_reward(block_number: bigint) {
  try {
    const block = await node.core.getBlock(Number(block_number));

    const transactions = block.transactions;
    const baseFeePerGas = block.baseFeePerGas;
    const gasUsed = block.gasUsed;

    let minerTips = [];
    let sumMinerTips = 0;
    for (const tx of transactions) {
      const txGasUseage = await node.core.getTransactionReceipt(tx);

      const totalFee = ethers.formatEther(
        BigInt(Number(txGasUseage?.gasUsed) * Number(txGasUseage?.effectiveGasPrice)).toString()
      );

      minerTips.push(Number(totalFee));
    }

    if (transactions.length > 0) {
      sumMinerTips = minerTips.reduce((prevTip, currentTip) => prevTip + currentTip);
    }

    const burnedFee = ethers.formatEther(BigInt(Number(gasUsed) * Number(baseFeePerGas)).toString());

    const baseBlockReward = 2;

    const blockReward = baseBlockReward + (sumMinerTips - Number(burnedFee));

    return blockReward;
  } catch (error) {
    console.log(error);
  }
}
