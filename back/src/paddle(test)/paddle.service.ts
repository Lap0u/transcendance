import { Injectable } from '@nestjs/common';
import { paddles } from './paddle.default';
import { CreatePaddleDto, UpdatePaddleDto } from './paddle.dto';
import { v4 as uuid} from 'uuid';

@Injectable()
export class PaddleService {
	private  paddles : CreatePaddleDto[] = paddles
	
	getPaddles() : CreatePaddleDto[] {
		return this.paddles
	}

	getPaddleById(paddleId : string) : CreatePaddleDto {
		return this.paddles.find(paddle => {
			return paddle.id === paddleId
		})
	}

	createPaddle(payload :UpdatePaddleDto): CreatePaddleDto {
		let newPaddle = {
			id: uuid(),
			...payload
		}
		this.paddles.push(newPaddle);
		return newPaddle;
	}

	updatePaddle(payload: UpdatePaddleDto, paddleId: string) {
		let updatedPaddle: CreatePaddleDto;
		
		const updatedPaddleList = this.paddles.map(paddle => {
			if (paddle.id === paddleId){
				updatedPaddle = {
					id: paddleId,
					...payload
				}
				return updatedPaddle
			} else return paddle
		});

		this.paddles = updatedPaddleList;

		return updatedPaddle;
	}
}
