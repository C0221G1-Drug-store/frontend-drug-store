import {Account} from "./account";
import {Role} from "./role";

export interface UserRole {
  id?: number;
  role?: Role;
  user?: Account;
}
