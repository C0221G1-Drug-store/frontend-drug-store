export interface Account {
  id?: number;
  userName?: string;
  userCode?: string;
  accountName?: string;
  password?: string;
  enabled?: number;
  userRoles?: UserRole[];
}

export interface UserRole {
  id?: number;
  role?: Role;
  user?: Account;
}

export interface Role {
  id?: number;
  roleName?: string;
}

