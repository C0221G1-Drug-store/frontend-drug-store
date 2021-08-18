import {UserRole} from "./user-role";

export interface Account {
  userId?: number;
  userName?: string;
  userCode?: string;
  accountName?: string;
  encrytedPassword?: string;
  enabled?: number;
  userRoles?: UserRole[];
}
