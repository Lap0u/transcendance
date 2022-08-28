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
  @PrimaryGeneratedColumn()
  account_id: string;

  @Column({ unique: true, nullable: true })
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  accountUsername: string;

  @JoinColumn({ name: 'avatar' })
  @OneToOne(() => DatabaseFile, {
    nullable: true,
  })
  @Column({ nullable: true })
  public avatar?: number;
}
