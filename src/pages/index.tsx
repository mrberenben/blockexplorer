import { Link } from "react-router-dom";

// components
import { Container, Section } from "~/components/Layout";
import Icon from "~/components/shared/Icon";
import { truncate } from "~/utils/parse";

export default function Index() {
  return (
    <Container>
      <Stats />

      <LatestActions />
    </Container>
  );
}

function Stats() {
  return (
    <Section title={<StatsTitle />}>
      <div className="flex flex-1 items-center gap-x-2">
        <div className="flex items-center gap-x-4 py-7 px-6 min-w-64 border border-solid border-border">
          <Icon icon="transactions" className="w-6 h-6" />
          <div className="flex flex-col">
            <small className="text-sm uppercase text-muted-foreground">transactions</small>
            <strong className="text-lg font-black text-foreground">2,219.01 M</strong>
          </div>
        </div>

        <div className="flex items-center gap-x-4 py-7 px-6 min-w-64 border border-solid border-border">
          <Icon icon="hourglass" className="w-6 h-6" />
          <div className="flex flex-col">
            <small className="text-sm uppercase text-muted-foreground">latest block</small>
            <strong className="text-lg font-black text-foreground">18968474</strong>
          </div>
        </div>
      </div>
    </Section>
  );
}

function StatsTitle() {
  return (
    <div className="flex items-center gap-x-3">
      <span className="relative flex justify-center items-center h-2.5 w-2.5">
        <span
          aria-live="polite"
          className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
        />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
      </span>
      <h3 className="text-xl font-black uppercase">Stats</h3>
    </div>
  );
}

function LatestActions() {
  const blocks = ["1", "2", "3", "4", "5"];
  const txs = ["1", "2", "3", "4", "5"];

  return (
    <div className="flex flex-1 flex-wrap gap-8">
      <Section title="Latest Blocks" className="min-w-[540px]">
        <div className="flex flex-1 flex-col rounded border border-solid border-border divide-y divide-solid divide-border">
          {blocks.map(block => (
            <Block key={block} number={Number(block)} />
          ))}

          <Link
            to="/blocks"
            className="flex flex-1 justify-center items-center py-3.5 px-4 gap-x-3 text-center text-xs font-black uppercase hover:bg-foreground/[.025] transition-colors duration-75"
          >
            View All
            <Icon icon="arrow_right" className="w-3 h-3 -rotate-45" />
          </Link>
        </div>
      </Section>

      <Section title="Latest Transactions" className="min-w-[540px]">
        <div className="flex flex-1 flex-col rounded border border-solid border-border divide-y divide-solid divide-border">
          {txs.map(block => (
            <Transaction key={block} number={Number(block)} />
          ))}

          <Link
            to="/transactions"
            className="flex flex-1 justify-center items-center py-3.5 px-4 gap-x-3 text-center text-xs font-black uppercase hover:bg-foreground/[.025] transition-colors duration-75"
          >
            View All
            <Icon icon="arrow_right" className="w-3 h-3 -rotate-45" />
          </Link>
        </div>
      </Section>
    </div>
  );
}

interface BlockProps {
  number: number;
}

function Block(props: BlockProps) {
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
        <strong className="font-bold text-ethereum">#{props.number}</strong>
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

interface TransactionProps {
  number: number;
}

function Transaction(props: TransactionProps) {
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
        <strong className="font-bold text-ethereum">{truncate("0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5")}</strong>
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
