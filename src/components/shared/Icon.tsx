// utils
import { cn } from "~/utils/cn";

// lib
import * as Icons from "~/lib/icons";

const match: Record<keyof typeof Icons, JSX.Element> = {
  sync: Icons.sync,
  account: Icons.account,
  search: Icons.search,
  hourglass: Icons.hourglass,
  transactions: Icons.transactions,
  block: Icons.block,
  commit: Icons.commit,
  arrow_right: Icons.arrow_right,
  heart: Icons.heart,
  fill: Icons.fill
};

interface IconProps {
  icon: keyof typeof Icons;
  className?: string;
}

/**
 * @param {string} icon key for icon match
 * @returns {node | null} svg element || null
 */
export default function Icon({ icon, className }: IconProps) {
  if (typeof icon !== "string" || !match[icon.toLowerCase() as keyof typeof Icons]) return null;

  return <span className={cn("icon flex w-4 h-4", className)}>{match[icon.toLowerCase() as keyof typeof Icons]}</span>;
}
