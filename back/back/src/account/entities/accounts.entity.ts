import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { PublicInfoUserDto } from '../utils/types';
import DatabaseFile from './files.entity';

@Entity({ name: 'Accounts' })
export class Accounts {
  @PrimaryGeneratedColumn('uuid')
  account_id: string;

  @Column({ unique: true, nullable: true })
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  username: string;

  @Column({ unique: true, nullable: true })
  accountUsername: string;

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;

  @Column({ default: null })
  public email: string;

  @Column({ nullable: true })
  public authConfirmToken?: string;

  @Column({ default: false })
  public isVerified?: boolean;

  @Column({ nullable: true })
  public twoFactorAuthenticationSecret?: string;

  @Column('text', { array: true, default: [] })
  blacklist!: string[];

  @JoinColumn({ name: 'avatar' })
  @ManyToOne(() => DatabaseFile, {
    nullable: true,
  })
  @Column({ nullable: true })
  public avatar?: string;

  @Column({ nullable: true, default: 1000 })
  public points?: number;

  @Column({ nullable: true })
  public rank?: number;

  @Column('text', { array: true, default: [] })
  public socketsConnection?: Array<string>;

  @Column({ nullable: true, default: 0 })
  public currentGames?: number;

  @Column('text', { array: true, default: [] })
  public friendList?: Array<string>;
}
