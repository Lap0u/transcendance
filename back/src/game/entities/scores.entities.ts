import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Accounts' })
export class Accounts {
  @PrimaryGeneratedColumn('uuid')
  key: string;

  @Column({ nullable: true })
  idWinner: string;

  @Column({ nullable: true })
  idLoser: string;

  @Column({ nullable: true })
  ScorePlayer1: number;

  @Column({ nullable: true })
  ScorePlayer2: number;
}
