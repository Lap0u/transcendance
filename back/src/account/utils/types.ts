import { Accounts } from '../entities/accounts.entity';

export type IntraUserDetails = {
  id: string;
  username: string;
  name: string;
  accountUsername: string;
  avatar: string;
};

export type DatabaseFile = {
  id: string;
  filename: string;
  data: Uint8Array;
};

export type Done = (err: Error, user: Accounts) => void;
