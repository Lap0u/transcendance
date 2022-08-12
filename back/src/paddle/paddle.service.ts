import { Injectable } from '@nestjs/common';
import { paddles } from './paddle.default';
import { CreatePaddleDto } from './paddle.dto';

@Injectable()
export class PaddleService {
	private  paddles = paddles
	getPaddles() : CreatePaddleDto {
		return this.paddles
	}
}
