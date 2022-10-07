import { Accounts } from '../entities/accounts.entity';

export type IntraUserDetails = {
  id: string;
  username: string;
  name: string;
  accountUsername: string;
  isTwoFactorAuthenticationEnabled: boolean;
  authConfirmToken?: string;
  isVerified?: boolean;
  twoFactorAuthenticationSecret?: string;
  email: string;
  avatar: string;
  points: number;
  rank?: number;
  socketsConnection?: string[];
  currentGames?: number;
};

export type DatabaseFile = {
  id: string;
  filename: string;
  data: Uint8Array;
  isDefault: boolean;
};

export type TokenPayload = {
  id: string;
  isSecondFactorAuthenticated: boolean;
};

export type Done = (err: Error, user: Accounts) => void;
