import { ethers } from "ethers";

const provider = new ethers.EtherscanProvider(undefined, import.meta.env.VITE_ETHERSCAN_SECRET);

export async function get_latest_block() {
  return await provider.getBlockNumber();
}

export async function get_ether_price() {
  return await provider.getEtherPrice();
}

export async function get_estimated_gas() {
  return await provider.getFeeData();
}

export async function get_total_transactions() {
  const last_index = await provider.getBlockNumber();
  const latest_block = await provider.getBlock(last_index);

  return latest_block?.length;
}
