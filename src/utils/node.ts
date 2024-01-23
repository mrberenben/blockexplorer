// alchemy
import { Network, Alchemy, Utils } from "alchemy-sdk";

// types
import { Transaction } from "~/types/node.types";

const settings = {
  apiKey: import.meta.env.VITE_ALCHEMY_SECRET,
  network: Network.ETH_MAINNET
};

export const node = new Alchemy(settings);

export async function get_last_blocks() {
  const leaf = await node.core.getBlock("latest");
  let tree = [leaf];

  for (let i = BigInt(Number(leaf.number) - 1); i > Number(leaf.number) - 5; i--) {
    const block = await node.core.getBlock(Number(i));

    tree.push(block);
  }

  return tree;
}

export async function get_latest_block() {
  const block = await node.core.getBlock("latest");
  return block;
}

export async function get_latest_transactions(): Promise<Transaction[]> {
  const block = await get_latest_block();

  if (!block || !block.transactions) return [];

  return (await Promise.all([
    ...block.transactions.slice(0, 5).map((tx: string) => node.transact.getTransaction(tx))
  ])) as unknown as Transaction[];
}

export function format_ether(value: bigint) {
  return Utils.formatEther(value);
}
