export interface Block {
  hash: string;
  parentHash: string;
  number: number;
  timestamp: number;
  nonce: string;
  difficulty: number;
  gasLimit: bigint;
  gasUsed: bigint;
  miner: string;
  extraData: string;
  transactions: string[];
  baseFeePerGas: bigint;
  _difficulty: bigint;
}

export interface Transaction {
  hash: string;
  type: number;
  accessList: WhiteList[];
  blockHash: string;
  blockNumber: number;
  transactionIndex: number;
  confirmations: number;
  from: string;
  gasPrice: bigint;
  maxPriorityFeePerGas: bigint;
  maxFeePerGas: bigint;
  gasLimit: bigint;
  to: string;
  value: bigint;
  nonce: number;
  data: string;
  r: string;
  s: string;
  v: number;
  creates: unknown | null;
  chainId: number;
}

type WhiteList = {
  address: string;
  storageKeys: string[];
};
