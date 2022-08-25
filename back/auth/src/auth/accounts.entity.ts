import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  avatar: string;

  @Column({ nullable: true })
  accountUsername: string;
}
