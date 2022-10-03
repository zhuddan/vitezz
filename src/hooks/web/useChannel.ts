import type { Channel } from '@/utils/Channel';

export function useChannel(channel: Channel, callback: Fn) {
  onMounted(() => channel.subscribe(callback));
  onUnmounted(() => channel.unsubscribe(callback));
}
