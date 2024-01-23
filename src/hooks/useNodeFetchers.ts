import React from "react";

// utils
import { get_last_blocks, get_latest_block, get_latest_transactions } from "~/utils/node";

// types
import { Block, Transaction } from "~/types/node.types";

type useLastBlocksReturnType = {
  blocks: Block[];
  refetch: () => Promise<void>;
};

export function useLastBlocks(): useLastBlocksReturnType {
  const [blocks, setBlocks] = React.useState<Block[]>([]);

  async function refetch() {
    const blocks = await get_last_blocks();
    setBlocks(blocks as unknown as Block[]);
  }

  React.useEffect(() => {
    refetch();
  }, []);

  return { blocks, refetch };
}

type useLastTransactionsReturnType = {
  transactions: Transaction[];
  refetch: () => Promise<void>;
};

export function useLastTransactions(): useLastTransactionsReturnType {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  async function refetch() {
    const txs = await get_latest_transactions();
    setTransactions(txs);
  }

  React.useEffect(() => {
    refetch();
  }, []);

  return { transactions, refetch };
}

export function useLatestBlock(): Block | undefined {
  const [block, setBlock] = React.useState<Block | undefined>(undefined);

  React.useEffect(() => {
    void (async function () {
      const block = await get_latest_block();
      setBlock(block as unknown as Block);
    })();
  }, []);

  return block;
}
