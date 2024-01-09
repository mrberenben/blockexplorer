import React from "react";

// utils
import { get_estimated_gas, get_ether_price, get_latest_block, get_total_transactions } from "~/utils/ethers";

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

export function useEthereumStats(): EthereumStats {
  const [stats, setStats] = React.useState<EthereumStats>(INITIAL_ETHEREUM_STATS);

  React.useEffect(() => {
    void (async function () {
      const [ether, latest, gas, transactions] = await Promise.all([
        get_ether_price(),
        get_latest_block(),
        get_estimated_gas(),
        get_total_transactions()
      ]);

      setStats({
        ether,
        latest,
        gas: gas.gasPrice,
        transactions
      });
    })();
  }, []);

  return stats;
}
