import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
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
  ScorePlayer1: number;

  @Column({ nullable: true })
  ScorePlayer2: number;

  @CreateDateColumn({ type: 'timestamp' })
  date!: Date;

  @Column({ nullable: true })
  PointsWon: number;

  @Column({ nullable: true })
  PointsLost: number;
}
