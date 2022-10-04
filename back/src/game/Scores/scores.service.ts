import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts } from '../../account/entities/accounts.entity';
import { Scores } from './entities/scores.entities';
import { ScoresDbDto, ScoresDto } from './utils/types';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Accounts) private userRepo: Repository<Accounts>,
    @InjectRepository(Scores) private scoresRepo: Repository<Scores>,
  ) {}

  async histoty() {
    return await this.scoresRepo.find();
  }

  async historyById(account_id: string) {
    const total: ScoresDbDto[] = await this.scoresRepo.find({
      where: [{ idWinner: account_id }, { idLoser: account_id }],
      order: { date: 'DESC' },
    });
    for (const player of total) {
      player.winner = await this.userRepo.findOneBy({
        account_id: player.idWinner,
      });
      player.loser = await this.userRepo.findOneBy({
        account_id: player.idLoser,
      });
    }
    return total;
  }

  async addScore(scores: ScoresDto) {
    const idWinner = scores.idWinner;
    const idLoser = scores.idLoser;
    const scoreDb: ScoresDbDto = {
      ...scores,
      winner: await this.userRepo.findOneBy({ account_id: idWinner }),
      loser: await this.userRepo.findOneBy({ account_id: idLoser }),
    };
    const newScore = this.scoresRepo.create(scoreDb);
    await this.addPoint(scores.idWinner, scores.ScorePlayer1);
    const res = this.scoresRepo.save(newScore);
    await this.userRepo.save({
      ...scoreDb.winner,
      rank: await this.getRank(scoreDb.winner.id),
    });
    await this.userRepo.save({
      ...scoreDb.loser,
      rank: await this.getRank(scoreDb.loser.id),
    });
    return res;
  }

  async getRank(id: string) {
    const classement: Accounts[] = await this.getClassement();
    return classement.findIndex((elem) => elem.id === id) + 1;
  }

  async statsById(id: string) {
    const gameWon = await this.scoresRepo.countBy({ idWinner: id });
    const gameLost = await this.scoresRepo.countBy({ idLoser: id });
    return { gameWon: gameWon, gameLost: gameLost };
  }

  async getClassement() {
    return await this.userRepo.find({ order: { points: 'DESC' } });
  }

  async addPoint(account_id: string, points: number) {
    const user = await this.userRepo.findOneBy({ account_id });
    const newPoints: number = +user.points + +points;
    return await this.userRepo.save({
      ...user, // existing fields
      points: newPoints,
    });
  }
}
