import React from "react";

// utils
import { cn } from "~/utils/cn";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Skeleton(props: SkeletonProps) {
  return (
    <span
      className={cn("flex w-24 h-4 rounded bg-muted animate-pulse", props.className)}
      style={props.style ? props.style : {}}
    />
  );
}
