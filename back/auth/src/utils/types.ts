import { Accounts } from '../auth/accounts.entity';

export type UserDetails = {
  id: string;
  intraId: string;
  name: string;
  Intralogin: string;
  avatar: string;
};

export type IntraUserDetails = {
  id: string;
  username: string;
  name: string;
  avatar: string;
  accountUsername: string;
};

export type Done = (err: Error, user: Accounts) => void;
