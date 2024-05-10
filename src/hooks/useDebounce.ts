import { useRef } from "react";
import { AnyFunc, Args } from "./types";

export const useDebounce = <T extends AnyFunc>(func: T, delay: number) => {
  const timer = useRef<NodeJS.Timeout>();
  return (...args: Args<T>) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
