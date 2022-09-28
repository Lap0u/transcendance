import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts } from '../../account/entities/accounts.entity';
import { Scores } from './entities/scores.entities';
import { ScoresDto } from './utils/types';

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
    const player1 = await this.scoresRepo.find({
      where: { idWinner: account_id },
    });
    const player2 = await this.scoresRepo.find({
      where: { idLoser: account_id },
    });
    return [...player1, ...player2];
  }

  calcPoints(winner: number, loser: number) {
	const diff = winner - loser
	const points = diff > 0 ? 20 - Math.round(diff / 30) : 20 + Math.round((diff * -1) / 30)
	if (points < 0)
		return 0
	return points
  }

  async addPoint(winnerId: string, loserId: string) {
	let account_id = winnerId;
    const winner = await this.userRepo.findOneBy({ account_id });
    account_id = loserId
    const loser = await this.userRepo.findOneBy({ account_id });
    const points = this.calcPoints(winner.points, loser.points)
	console.log('points', points);
	
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
  }


  async addScore(scores: ScoresDto) {
    const newScore = this.scoresRepo.create(scores);
    await this.addPoint(scores.idWinner, scores.idLoser);
    return this.scoresRepo.save(newScore); 
  }

  async statsById(id: string) {
    const gameWon = await this.scoresRepo.countBy({ idWinner: id });
    const gameLost = await this.scoresRepo.countBy({ idLoser: id });
    return { gameWon: gameWon, gameLost: gameLost };
  }

  async getClassement() {
    return await this.userRepo.find({ order: { points: 'DESC' } });
  }
}