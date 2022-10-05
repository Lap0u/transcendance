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

  async addScore(scores: ScoresDto, isCustom: boolean) {
    const idWinner = scores.idWinner;
    const idLoser = scores.idLoser;
    if (isCustom)
      //game officielle
      scores.PointsWon = scores.PointsLost = await this.addPoint(
        scores.idWinner,
        scores.idLoser,
      );
    else scores.PointsWon = scores.PointsLost = 0;
    const scoreDb: ScoresDbDto = {
      ...scores,
      winner: await this.userRepo.findOneBy({ account_id: idWinner }),
      loser: await this.userRepo.findOneBy({ account_id: idLoser }),
    };
    const newScore = this.scoresRepo.create(scoreDb);
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

  calcPoints(winner: number, loser: number) {
    const diff = winner - loser;
    const points =
      diff > 0 ? 20 - Math.round(diff / 30) : 20 + Math.round((diff * -1) / 30);
    if (points < 0) return 0;
    return points;
  }

  async addPoint(winnerId: string, loserId: string) {
    let account_id = winnerId;
    const winner = await this.userRepo.findOneBy({ account_id });
    account_id = loserId;
    const loser = await this.userRepo.findOneBy({ account_id });
    const points = this.calcPoints(winner.points, loser.points);

    let newPoints: number = +winner.points + +points;
    await this.userRepo.save({
      ...winner, // existing fields
      points: newPoints,
    });
    newPoints = +loser.points - +points;
    await this.userRepo.save({
      ...loser, // existing fields
      points: newPoints,
    });
    return points;
  }
}
