export type AnyFunc = (...args: any[]) => any;
export type Args<T extends AnyFunc> = T extends (...args: infer A) => any
  ? A
  : never;
