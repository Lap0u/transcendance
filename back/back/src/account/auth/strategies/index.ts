/* eslint-disable prettier/prettier */
import { Strategy, Profile } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthentificationProvider } from '../auth';
import { IntraUserDetails } from '../../utils/types';
import { DatabaseFilesService } from '../../files/databaseFile.service';
import { ScoresService } from '../../../game/Scores/scores.service';
import { AccountService } from '../../account/account.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts } from '../../entities/accounts.entity';

@Injectable()
export class Strategy42 extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthentificationProvider,
    private readonly databaseFilesService: DatabaseFilesService,
    private readonly scoresService: ScoresService,
    @InjectRepository(Accounts) private usersRepository: Repository<Accounts>,
  ) {
    super({
      clientID: process.env.CLIENT_42_UUID,
      clientSecret: process.env.CLIENT_42_SECRET,
      callbackURL: process.env.CLIENT_42_CALLBACK,
      scope: ['public'],
    });
    this.databaseFilesService.initDBFiles();
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, username, name } = profile;
    let accountUsername = username;
    while ((await this.usersRepository.findOneBy({ accountUsername })) !== null)
      accountUsername += '0';
    const file = await this.databaseFilesService.getDefaultFile();
    const avatar = file.id;
    const isTwoFactorAuthenticationEnabled = false;
    const email: string = null;
    const points = 1000;
    const details: IntraUserDetails = {
      id,
      username,
      name,
      accountUsername,
      isTwoFactorAuthenticationEnabled,
      email,
      avatar,
      points,
    };
    const user = await this.authService.validateUser(details);
    this.usersRepository.save({
      ...user,
      rank: await this.scoresService.getRank(user.id),
    });
    return user;
  }
}
