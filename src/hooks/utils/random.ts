export function useRandomArray<T>(...args: T[]) {
  const length = args.length;
  const rand = Math.floor(length * Math.random());
  return args[rand];
}