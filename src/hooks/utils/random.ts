export function useRandomNumber(end: number): number;
export function useRandomNumber(maybeStart: number, maybeEnd = 1) {
  const start = arguments.length == 1 ? 0 : maybeStart;
  const end = arguments.length == 1 ? maybeStart : maybeEnd;
  const diff = end - start;
  const result = Math.random() * diff;
  return Math.floor(result);
}
export function useRandomArray<T>(data: T[]) {
  return data[useRandomNumber(data.length)];
}
