import { useUserStore } from './modules/user';

export function initStore() {
  const user = useUserStore();
  console.log(user);
}
