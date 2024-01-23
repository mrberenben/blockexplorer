import React from "react";
import { Link } from "react-router-dom";

// components
import { Container, Section } from "~/components/Layout";
import Skeleton from "~/components/shared/Skeleton";
import Transaction from "~/components/Transaction";
import Block from "~/components/Block";
import Image from "~/components/shared/Image";
import Icon from "~/components/shared/Icon";

// hooks
import { useEthereumStats } from "~/hooks/useEthereumFetchers";
import { useLastBlocks, useLastTransactions } from "~/hooks/useNodeFetchers";

// utils
import { format, units } from "~/utils/parse";

// config
import * as Images from "~/config/images";
import { useInterval } from "~/hooks/useInterval";

export default function Index() {
  return (
    <Container>
      <Stats />

      <LatestActions />
    </Container>
  );
}

function Stats() {
  const { stats, refetch } = useEthereumStats();

  // update every 10 seconds
  useInterval(() => refetch(), 10_000);

  return (
    <Section title={<StatsTitle />}>
      <div className="flex flex-1 flex-wrap items-stretch gap-2">
        <StatsBlock
          title="ether price"
          icon={<Image src={Images.Ethereum} width="100%" height="100%" objectFit="contain" />}
          value={stats.ether ? `${format(stats.ether)}$` : undefined}
        />
        <StatsBlock
          title="transactions"
          icon={<Icon icon="transactions" className="w-6 h-6" />}
          value={stats.transactions}
        />
        <StatsBlock title="latest block" icon={<Icon icon="hourglass" className="w-6 h-6" />} value={stats.latest} />
        <StatsBlock
          title="gas"
          icon={<Icon icon="fill" className="w-6 h-6" />}
          value={stats.gas ? `${format(units(stats.gas, "gwei"))} GWEI` : undefined}
        />
      </div>
    </Section>
  );
}

interface StatsBlockProps {
  title: string;
  value: string | number | null | undefined;
  icon: React.ReactNode;
}

function StatsBlock(props: StatsBlockProps) {
  return (
    <div className="flex flex-1 items-center gap-x-4 py-7 px-6 min-w-60 border border-solid border-border">
      <span className="relative flex w-6 h-6 overflow-hidden">{props.icon}</span>
      <div className="flex flex-col">
        <small className="text-sm uppercase text-muted-foreground">{props.title}</small>
        <strong className="text-lg font-black text-foreground">
          {props.value ? props.value : <Skeleton className="mt-1.5" />}
        </strong>
      </div>
    </div>
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
  return (
    <div className="flex flex-1 flex-wrap gap-8">
      <Section title="Latest Blocks" className="min-w-[490px]" live>
        <LatestBlocks />
      </Section>

      <Section title="Latest Transactions" className="min-w-[490px]" live>
        <LatestTransactions />
      </Section>
    </div>
  );
}

function LatestBlocks() {
  const { blocks, refetch } = useLastBlocks();

  // update every 10 seconds
  useInterval(() => refetch(), 10_000);

  return (
    <div className="flex flex-1 flex-col rounded border border-solid border-border divide-y divide-solid divide-border">
      {blocks.length > 0 ? blocks.map((block, index) => <Block key={index} block={block} />) : <Loader />}

      <Link
        to="/blocks"
        className="flex flex-1 justify-center items-center py-3.5 px-4 gap-x-3 text-center text-xs font-black uppercase hover:bg-foreground/[.025] transition-colors duration-75"
      >
        View All
        <Icon icon="arrow_right" className="w-3 h-3 -rotate-45" />
      </Link>
    </div>
  );
}

function LatestTransactions() {
  const { transactions, refetch } = useLastTransactions();

  // update every 10 seconds
  useInterval(() => refetch(), 10_000);

  return (
    <div className="flex flex-1 flex-col rounded border border-solid border-border divide-y divide-solid divide-border">
      {transactions.length > 0 ? transactions.map(tx => <Transaction key={tx.hash} tx={tx} />) : <Loader />}

      <Link
        to="/transactions"
        className="flex flex-1 justify-center items-center py-3.5 px-4 gap-x-3 text-center text-xs font-black uppercase hover:bg-foreground/[.025] transition-colors duration-75"
      >
        View All
        <Icon icon="arrow_right" className="w-3 h-3 -rotate-45" />
      </Link>
    </div>
  );
}

function Loader() {
  return [...Array(5).keys()].map((_, index) => (
    <div key={index} className="relative flex flex-row items-center px-4 gap-x-3 w-full h-[67px] animate-pulse">
      <span className="flex justify-center items-center w-8 h-8 rounded bg-muted text-muted-foreground" />

      <span className="flex flex-col gap-y-1">
        <span className="flex w-24 h-5 rounded bg-muted" />
        <span className="flex w-20 h-3 rounded bg-muted" />
      </span>

      <span className="flex flex-col mx-auto gap-y-1">
        <span className="flex w-20 h-3 rounded bg-muted" />
        <span className="flex w-24 h-3 rounded bg-muted" />
      </span>

      <span className="flex items-center gap-x-5 ml-auto">
        <span className="flex w-16 h-4 rounded bg-muted" />

        <span className="flex flex-col items-center gap-y-1">
          <span className="flex w-9 h-3 rounded bg-muted" />
          <span className="flex w-20 h-3 rounded bg-muted" />
        </span>

        <span className="flex w-3 h-3 rounded-full bg-muted" />
      </span>
    </div>
  ));
}
