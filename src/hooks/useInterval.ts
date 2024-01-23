import React from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = React.useRef(callback);

  // save callback
  React.useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // setup interval
  React.useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}
