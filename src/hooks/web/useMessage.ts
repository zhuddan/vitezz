export function useMessage() {
  return {
    // just test, you can configure  yourself msg
    msgError: (msg: string) => {
      console.warn(msg);
    },
    modalError: (msg: string) => {
      console.warn(msg);
    },
  };
}
