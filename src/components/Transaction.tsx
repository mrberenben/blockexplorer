import { Link } from "react-router-dom";

// components
import Icon from "~/components/shared/Icon";

// utils
import { truncate } from "~/utils/parse";

interface BlockProps {
  number: number;
}

export default function Block(props: BlockProps) {
  return (
    <Link
      to={`/tx/${props.number}`}
      className="group flex flex-1 items-center py-3.5 px-4 gap-x-3 hover:bg-foreground/[.025] transition-colors duration-75"
      title={`Block #${props.number}`}
      aria-label={`Block #${props.number}`}
    >
      <span className="flex justify-center items-center w-8 h-8 rounded bg-muted text-muted-foreground">
        <Icon icon="commit" />
      </span>

      <span className="flex flex-col">
        <strong className="font-bold text-accent">{truncate("0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5")}</strong>
        <small className="text-xs text-muted-foreground">
          {(Math.random() * props.number * 10).toFixed()} secs ago
        </small>
      </span>

      <span className="flex flex-col ml-auto text-muted-foreground text-xs">
        <span>
          From:{" "}
          <strong className="text-foreground font-black">
            {truncate("0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5")}
          </strong>
        </span>
        <span>
          To:{" "}
          <strong className="text-foreground font-black">
            {truncate("0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5")}
          </strong>
        </span>
      </span>

      <span className="flex items-center gap-x-5 ml-auto">
        <span className="flex flex-col items-center text-center text-xs">
          <span className="text-green-500 font-black drop-shadow-up">+0.064 ETH</span>
          <span className="text-xxs text-muted-foreground">Amount</span>
        </span>

        <span className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-75">
          <Icon icon="arrow_right" className="w-3 h-3 text-muted-foreground" />
        </span>
      </span>
    </Link>
  );
}
