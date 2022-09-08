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

  @Column({ unique: true, nullable: true })
  accountUsername: string;

  @Column({ nullable: true })
  filename: string;

  @Column({
    nullable: true,
    type: 'bytea',
  })
  data: Uint8Array;
}
	