// ethers
import { ethers, type BytesLike } from "ethers";

export function parse<T>(data: T) {
  if (!data) {
    console.error("[Parse] Data must be provided.");
    return {};
  }

  const parsed = typeof data === "string" && (data.startsWith("{") || data.startsWith("[")) ? JSON.parse(data) : data;
  return parsed;
}

// stringify message before send
export function stringify<T>(data: T) {
  if (!data) {
    console.error("[Parse] Data must be provided.");
    return "";
  }

  const stringified = typeof data !== "string" ? JSON.stringify(data) : data;
  return stringified;
}

/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address full address to truncate
 * @returns truncated address
 */
export function truncate(address: string | `0x${string}`) {
  if (typeof address !== "string") {
    console.error("[Parse] Address must be provided.");
    return address;
  }

  const ETH_REGEX = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

  const match = address.match(ETH_REGEX);

  if (!match) {
    console.error("[Parse] Address must be match ethereum regex.");
    return address;
  }

  return `${match[1]}••••${match[2]}`;
}

/**
 * Optional formatter parameters
 */
type FormatterOptions = Intl.NumberFormatOptions;

/**
 * Formats number as more human-readable shape
 * @param value number that will be formatted
 * @returns formatted number
 */
export function format(value: number | null | undefined, options?: FormatterOptions) {
  if (typeof value !== "number" || value === null) {
    return value;
  }

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  });

  return formatter.format(value);
}

/**
 * Formats number as more human-readable shape
 * @param value number that will be formatted
 * @returns formatted number
 */
export function units(value: BigInt | number | string | null | undefined, unit?: string | ethers.Numeric | undefined) {
  if (typeof value === "undefined" || value === null) {
    return value;
  }

  return Number(ethers.formatUnits(Number(value), unit));
}

export function read_hex(hex: BytesLike): string {
  try {
    return ethers.toUtf8String(hex);
  } catch {
    return "-";
  }
}

export function read_as_ether(wei: bigint): string {
  return ethers.formatUnits(Number(wei), "ether");
}

export function random(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
