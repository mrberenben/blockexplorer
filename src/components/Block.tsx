import { Link } from "react-router-dom";

// components
import Icon from "~/components/shared/Icon";

interface TransactionProps {
  number: number;
}

export default function Transaction(props: TransactionProps) {
  return (
    <Link
      to={`/block/${props.number}`}
      className="group flex flex-1 items-center py-3.5 px-4 gap-x-3 hover:bg-foreground/[.025] transition-colors duration-75"
      title={`Block #${props.number}`}
      aria-label={`Block #${props.number}`}
    >
      <span className="flex justify-center items-center w-8 h-8 rounded bg-muted text-muted-foreground">
        <Icon icon="block" />
      </span>

      <span className="flex flex-col">
        <strong className="font-bold text-accent">#{props.number}</strong>
        <small className="text-xs text-muted-foreground">
          {(Math.random() * props.number * 10).toFixed()} secs ago
        </small>
      </span>

      <span className="flex items-center gap-x-5 ml-auto">
        <span className="flex py-0.5 px-1.5 bg-muted text-muted-foreground text-xs font-black rounded border border-border">
          172 TXS
        </span>

        <span className="flex flex-col items-center text-center text-xs">
          <span className="text-green-500 font-black drop-shadow-up">+0.064 ETH</span>
          <span className="text-xxs text-muted-foreground">Block Reward</span>
        </span>

        <span className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-75">
          <Icon icon="arrow_right" className="w-3 h-3 text-muted-foreground" />
        </span>
      </span>
    </Link>
  );
}
