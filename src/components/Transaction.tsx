import { Link } from "react-router-dom";

// date-fns
import * as fns from "date-fns";

// components
import Icon from "~/components/shared/Icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/shared/Tooltip";

// utils
import { format, truncate } from "~/utils/parse";
import { format_ether } from "~/utils/node";

// types
import { Transaction } from "~/types/node.types";

interface TransactionProps {
  tx: Transaction;
}

export default function Transaction(props: TransactionProps) {
  return (
    <Link
      to={`/tx/${props.tx.hash}`}
      className="group flex flex-1 items-center py-3.5 px-4 gap-x-3 hover:bg-foreground/[.025] transition-colors duration-75"
      aria-label={`Tx #${props.tx.hash}`}
    >
      <span className="flex justify-center items-center w-8 h-8 rounded bg-muted text-muted-foreground">
        <Icon icon="commit" />
      </span>

      <span className="flex flex-col">
        <strong className="font-bold text-accent">{truncate(props.tx.hash)}</strong>
        <small className="text-xs text-muted-foreground">
          {fns.formatDistanceToNowStrict(fns.fromUnixTime(fns.getUnixTime(new Date())))}
        </small>
      </span>

      <span className="flex flex-col ml-auto text-muted-foreground text-xs">
        <span>
          From: <strong className="text-foreground font-black">{truncate(props.tx.from)}</strong>
        </span>
        <span>
          To: <strong className="text-foreground font-black">{truncate(props.tx.to)}</strong>
        </span>
      </span>

      <span className="flex items-center gap-x-5 ml-auto">
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger>
              <span className="flex flex-col items-end text-end text-xs">
                <span className="text-green-500 font-black drop-shadow-up">
                  +
                  {format(Number(format_ether(props.tx.value)), {
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 4
                  })}{" "}
                  ETH
                </span>
                <span className="text-xxs text-muted-foreground">Amount</span>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <small>{Number(format_ether(props.tx.value))} ETH</small>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <span className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-75">
          <Icon icon="arrow_right" className="w-3 h-3 text-muted-foreground" />
        </span>
      </span>
    </Link>
  );
}
