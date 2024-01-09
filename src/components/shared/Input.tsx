import React from "react";

// utils
import { cn } from "~/utils/cn";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input(props, ref) {
    const { className, hidden, ...rest } = props;

    return (
      <input
        ref={ref}
        className={cn(
          "flex flex-1 w-full rounded border-2 border-input bg-background px-3 py-2.5 text-sm font-medium placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-75",
          {
            hidden: hidden
          },
          className
        )}
        {...rest}
      />
    );
  }
);

export default Input;
