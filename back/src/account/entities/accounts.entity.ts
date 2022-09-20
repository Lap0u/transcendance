import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
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

  @Column({ unique: true, nullable: true })
  public authConfirmToken?: string;

  @Column({ unique: true, default: false })
  public isVerified?: boolean;

  @Column({ nullable: true })
  public twoFactorAuthenticationSecret?: string;

  @JoinColumn({ name: 'avatar' })
  @OneToOne(() => DatabaseFile, {
    nullable: true,
  })
  @Column({ nullable: true })
  public avatar?: string;
}
