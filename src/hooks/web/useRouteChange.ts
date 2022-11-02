export function useRouteChange(_path: string, fn?: (type: string) => any | void) {
  const route = useRoute();
  const path = computed(() => route.path);
  const type = computed(() => {
    const { type, type2 } = route.params;
    return (type || type2) as string;
  });

  watch(
    type,
    (type) => {
      if (path.value.startsWith(_path)) 
        fn?.(type);
      
    },
    {
      immediate: true,
    },
  );

  return type;
}
