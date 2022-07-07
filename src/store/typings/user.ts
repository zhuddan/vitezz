import type { UserInfo } from '@/api/model/userModel';

export interface UserState {
  info: Nullable<UserInfo>;
  roles: string[];
  permissions: string[];
}
