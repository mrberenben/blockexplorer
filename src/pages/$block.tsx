import React from "react";

// react-router
import { useNavigate, useParams, Link } from "react-router-dom";

// date-fns
import * as fns from "date-fns";

// components
import Icon from "~/components/shared/Icon";
import Skeleton from "~/components/shared/Skeleton";
import { Container, Section } from "~/components/Layout";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/shared/Tooltip";

// hooks
import { useBlockDetails } from "~/hooks/useNodeFetchers";

// types
import type { Block } from "~/types/node.types";

// utils
import { format, random, read_as_ether, read_hex } from "~/utils/parse";

export default function Block() {
  const params = useParams();
  const block_number = params.block;

  const block_details = useBlockDetails(block_number);

  console.log(block_details);

  if (typeof block_details === "undefined") return <BlockLoader />; // loading
  // if (block_details === null) return <ErrorHandler />; // error
  return (
    <Container>
      <BlockHeader block={block_number} />

      <Overview block_details={block_details} />
    </Container>
  );
}

interface BaseBlockProps {
  block: string;
}

function BlockHeader(props: BaseBlockProps) {
  const navigate = useNavigate();

  return (
    <Section>
      <header className="flex flex-row items-center gap-x-5">
        <button
          type="button"
          className="flex justify-center items-center w-10 h-10 rounded border border-solid border-border hover:bg-foreground/10 transition-colors duration-150"
          onClick={() => navigate(-1)}
        >
          <Icon icon="arrow_right" className="w-3.5 h-3.5 -rotate-180" />
        </button>

        <h1 className="text-2xl font-extrabold">Block #{props.block}</h1>
      </header>
    </Section>
  );
}

interface OverviewProps {
  block_details: Block | undefined;
}

function Overview(props: OverviewProps) {
  if (!props.block_details) return;

  const block = props.block_details;

  return (
    <Section className="pt-0">
      <main className="flex flex-1 flex-col rounded border border-solid border-border p-8 gap-y-6 sm:gap-y-3">
        <OverviewProperty>
          <OverviewPropertyKey description="Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block.">
            Block Height:
          </OverviewPropertyKey>
          <OverviewPropertyValue>{block.number}</OverviewPropertyValue>
        </OverviewProperty>

        <OverviewProperty>
          <OverviewPropertyKey description="The date and time at which a block is produced.">
            Timestamp:
          </OverviewPropertyKey>
          <OverviewPropertyValue>
            {fns.formatDistanceToNowStrict(fns.fromUnixTime(block.timestamp))} ago (
            {fns.format(fns.fromUnixTime(block.timestamp), "MMM-dd-yyyy hh:mm a")})
          </OverviewPropertyValue>
        </OverviewProperty>

        <OverviewProperty>
          <OverviewPropertyKey description="The number of transactions in the block. Internal transaction is transactions as a result of contract execution that involves Ether value.">
            Transactions:
          </OverviewPropertyKey>
          <OverviewPropertyValue>
            <Link to={`/txs/${block.number}`} className="flex items-center gap-x-1.5 hover:underline">
              {block.transactions.length}
              <span className="text-sm text-muted-foreground">(Click to view transactions)</span>
            </Link>
          </OverviewPropertyValue>
        </OverviewProperty>

        <OverviewSeperator />

        <OverviewProperty>
          <OverviewPropertyKey description="Address receiving fees from transactions in this block">
            Fee Recipient:
          </OverviewPropertyKey>
          <OverviewPropertyValue>
            <Link to={`/address/${block.miner}`} className="break-all hover:underline">
              {block.miner}
            </Link>
          </OverviewPropertyValue>
        </OverviewProperty>

        <OverviewProperty>
          <OverviewPropertyKey description="Total difficulty of the chain until this block.">
            Total Difficulty:
          </OverviewPropertyKey>
          <OverviewPropertyValue>{block.difficulty}</OverviewPropertyValue>
        </OverviewProperty>

        <OverviewProperty>
          <OverviewPropertyKey>Nonce:</OverviewPropertyKey>
          <OverviewPropertyValue>{Number(block.nonce)}</OverviewPropertyValue>
        </OverviewProperty>

        <OverviewSeperator />

        <OverviewProperty>
          <OverviewPropertyKey description="The total gas used in the block and its percentage of gas filled in the block.">
            Gas Used:
          </OverviewPropertyKey>
          <OverviewPropertyValue>{format(Number(block.gasUsed))}</OverviewPropertyValue>
        </OverviewProperty>

        <OverviewProperty>
          <OverviewPropertyKey description="Total gas limit provided by all transactions in the block.">
            Gas Limit:
          </OverviewPropertyKey>
          <OverviewPropertyValue>
            {format(Number(block.gasLimit), { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </OverviewPropertyValue>
        </OverviewProperty>

        <OverviewProperty>
          <OverviewPropertyKey description="Post-London Upgrade, this represents the minimum gasUsed multiplier required for a tx to be included in a block. ">
            Base Fee per Gas:
          </OverviewPropertyKey>
          <OverviewPropertyValue>{read_as_ether(block.baseFeePerGas)}</OverviewPropertyValue>
        </OverviewProperty>

        <OverviewProperty>
          <OverviewPropertyKey description="Any data that can be included by the block producer in the block.">
            Extra Data:
          </OverviewPropertyKey>
          <OverviewPropertyValue>{read_hex(block.extraData)}</OverviewPropertyValue>
        </OverviewProperty>
      </main>
    </Section>
  );
}

interface OverviewPropertyProps {
  children: React.ReactNode;
}

interface TooltipProps {
  description?: string;
}

function OverviewProperty(props: OverviewPropertyProps) {
  return <div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-x-5 gap-y-2">{props.children}</div>;
}

function OverviewPropertyKey(props: OverviewPropertyProps & TooltipProps) {
  return (
    <div className="flex sm:basis-48 text-muted-foreground">
      {props.description ? (
        <React.Fragment>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <Icon
                  icon="info"
                  className="w-3 h-3 text-muted-foreground hover:text-foreground transition-colors duration-150"
                />
              </TooltipTrigger>

              <TooltipContent className="max-w-72">{props.description}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="ml-3">{props.children}</span>
        </React.Fragment>
      ) : (
        props.children
      )}
    </div>
  );
}

function OverviewPropertyValue(props: OverviewPropertyProps) {
  return <div className="flex flex-1 font-bold">{props.children}</div>;
}

function OverviewSeperator() {
  return <hr className="my-3" />;
}

function BlockLoader() {
  return (
    <Container>
      <Section>
        <div className="flex flex-1 flex-col">
          <Skeleton className="w-64 h-10" />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="flex flex-1 flex-col rounded border border-solid border-border p-8 gap-y-7 sm:gap-y-4">
          {[...Array(10).keys()].map((_, index) => (
            <React.Fragment>
              {(index === 3 || index === 6) && <OverviewSeperator />}
              <div key={index} className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-x-5 gap-y-2">
                <Skeleton className="flex sm:basis-48 h-5" />
                <Skeleton className="h-5 max-w-64 !sm:max-w-none" style={{ width: random(250, 400) }} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </Section>
    </Container>
  );
}
