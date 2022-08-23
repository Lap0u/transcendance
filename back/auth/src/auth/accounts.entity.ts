import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Accounts' })
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column({ nullable: true })
  avatar: string;
}
