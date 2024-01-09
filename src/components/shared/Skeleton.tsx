// utils
import { cn } from "~/utils/cn";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton(props: SkeletonProps) {
  return <span className={cn("flex w-24 h-4 rounded bg-muted animate-pulse", props.className)} />;
}
