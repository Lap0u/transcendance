import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Scores' })
export class Scores {
  @PrimaryGeneratedColumn('uuid')
  account_id: string;

  @Column({ nullable: true })
  idWinner: string;

  @Column({ nullable: true })
  idLoser: string;

  @Column({ nullable: true })
  UsernameWinner: string;

  @Column({ nullable: true })
  UsernameLoser: string;

  @Column({ nullable: true })
  ScorePlayer1: number;

  @Column({ nullable: true })
  ScorePlayer2: number;
}
