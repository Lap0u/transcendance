import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Accounts' })
export class Accounts {
  @PrimaryGeneratedColumn('uuid')
  account_id: string;

  @Column({ unique: true, nullable: true })
  Idplayer1: string;

  @Column({ nullable: true })
  Idplayer2: string;

  @Column({ nullable: true })
  ScorePlayer1: number;

  @Column({ nullable: true })
  ScorePlayer2: number;
}
