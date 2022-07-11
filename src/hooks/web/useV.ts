export function useLoading<SS extends string = string>(keys: SS[]) {
  type Loading = {
    [key in SS]: boolean;
  };
  const data = {} as Loading;
  for (let index = 0; index < keys.length; index++) {
    const key = data[index];
    data[key] = true;
  }
  return {} as Loading;
}

const loading = useLoading(['unit']);

loading.unit == true;
