import { Link } from "react-router-dom";

import * as fns from "date-fns";

// components
import Icon from "~/components/shared/Icon";

// utils
import { truncate } from "~/utils/parse";

// types
import type { Block } from "~/types/node.types";

interface BlockProps {
  block: Block;
}

export default function Block(props: BlockProps) {
  return (
    <Link
      to={`/block/${props.block.number}`}
      className="group flex flex-1 items-center py-3.5 px-4 gap-x-3 hover:bg-foreground/[.025] transition-colors duration-75"
      aria-label={`Block #${props.block.number}`}
    >
      <span className="flex justify-center items-center w-8 h-8 rounded bg-muted text-muted-foreground">
        <Icon icon="block" />
      </span>

      <span className="flex flex-col">
        <strong className="font-bold text-accent">#{Number(props.block.number)}</strong>
        <small className="text-xs text-muted-foreground">
          {fns.formatDistanceToNowStrict(fns.fromUnixTime(Number(props.block.timestamp)))}
        </small>
      </span>

      <span className="flex flex-col mx-auto">
        <strong className="text-xs text-muted-foreground">Fee Receipent</strong>
        <small className="text-xs text-foreground font-black">{truncate(props.block.miner)}</small>
      </span>

      <span className="flex items-center gap-x-7 ml-auto">
        <span className="flex py-0.5 px-1.5 bg-muted text-muted-foreground text-xs font-black rounded border border-border">
          {Number(props.block.transactions.length)} TXS
        </span>

        {/* <span className="flex flex-col items-end text-end text-xs">
          <span className="text-green-500 font-black drop-shadow-up">0 ETH</span>
          <span className="text-xxs text-muted-foreground">Block Reward</span>
        </span> */}

        <span className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-75">
          <Icon icon="arrow_right" className="w-3 h-3 text-muted-foreground" />
        </span>
      </span>
    </Link>
  );
}
