import React from "react";
import { Link } from "react-router-dom";

// components
import { Container, Section } from "~/components/Layout";
import Skeleton from "~/components/shared/Skeleton";
import Transaction from "~/components/Transaction";
import Block from "~/components/Transaction";
import Image from "~/components/shared/Image";
import Icon from "~/components/shared/Icon";

// hooks
import { useEthereumStats } from "~/hooks/useEthereumFetchers";

// utils
import { format, units } from "~/utils/parse";

// config
import * as Images from "~/config/images";

export default function Index() {
  return (
    <Container>
      <Stats />

      <LatestActions />
    </Container>
  );
}

function Stats() {
  const stats = useEthereumStats();

  return (
    <Section title={<StatsTitle />}>
      <div className="flex flex-1 flex-wrap items-stretch gap-x-2">
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
          value={stats.gas ? format(units(stats.gas, "gwei")) : undefined}
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
    <div className="flex flex-1 items-center gap-x-4 py-7 px-6 border border-solid border-border">
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
