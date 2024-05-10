import { useRef } from "react";
import { AnyFunc, Args } from "./types";

export const useThrottle = <T extends AnyFunc>(func: T, delay: number) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  return (...args: Args<T>) => {
    if (!timerRef.current) {
      func.apply(this, args);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
      }, delay);
    }
  };
};
