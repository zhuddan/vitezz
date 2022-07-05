export function useMessage() {
  return {
    // just test, you can configure  yourself msg
    msgError: (msg: string) => {
      console.error('error', msg);
    },
    modalError: (msg: string) => {
      console.error('error', msg);
    },
  };
}
