import React from "react";

// utils
import { get_estimated_gas, get_ether_price, get_latest_block_number, get_total_transactions } from "~/utils/etherscan";

interface EthereumStats {
  ether: number;
  gas: BigInt | null;
  latest: number;
  transactions: number | undefined;
}

const INITIAL_ETHEREUM_STATS: EthereumStats = {
  ether: 0,
  gas: 0n,
  latest: 0,
  transactions: 0
};

type useEthereumStatsReturnType = {
  stats: EthereumStats;
  refetch: () => Promise<void>;
};

export function useEthereumStats(): useEthereumStatsReturnType {
  const [stats, setStats] = React.useState<EthereumStats>(INITIAL_ETHEREUM_STATS);

  async function refetch() {
    const [ether, latest, gas, transactions] = await Promise.all([
      get_ether_price(),
      get_latest_block_number(),
      get_estimated_gas(),
      get_total_transactions()
    ]);

    setStats({
      ether,
      latest,
      gas: gas.gasPrice,
      transactions
    });
  }

  React.useEffect(() => {
    refetch();
  }, []);

  return { stats, refetch };
}
