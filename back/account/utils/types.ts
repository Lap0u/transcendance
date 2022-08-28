import { Accounts } from '../entities/accounts.entity';

export type IntraUserDetails = {
  id: string;
  username: string;
  name: string;
  avatar: number;
  accountUsername: string;
};

export type DatabaseFile = {
  id: number;
  filename: string;
  data: Uint8Array;
};

export type Done = (err: Error, user: Accounts) => void;
