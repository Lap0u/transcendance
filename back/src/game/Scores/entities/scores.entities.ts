import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Accounts } from '../../../account/entities/accounts.entity';

@Entity({ name: 'Scores' })
export class Scores {
  @PrimaryGeneratedColumn('uuid')
  key: string;

  @JoinColumn({ name: 'idWinner' })
  @ManyToOne(() => Accounts, {
    nullable: true,
  })
  @Column({ nullable: true })
  public idWinner: string;

  @JoinColumn({ name: 'idLoser' })
  @ManyToOne(() => Accounts, {
    nullable: true,
  })
  @Column({ nullable: true })
  public idLoser: string;

  @Column({ nullable: true })
  public UsernameWinner?: string;

  @Column({ nullable: true })
  public UsernameLoser?: string;

  @Column({ nullable: true })
  ScorePlayer1: number;

  @Column({ nullable: true })
  ScorePlayer2: number;
}
