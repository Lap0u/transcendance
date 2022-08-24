import { Controller, Get, Put, Param, Body, Post } from "@nestjs/common";
import { CreatePaddleDto, UpdatePaddleDto } from "./paddle.dto";
import { PaddleService } from "./paddle.service";

@Controller('paddle')
export class PaddleController {
	constructor(private readonly paddleService : PaddleService) {}
	@Get() 
	getPaddles() : CreatePaddleDto[]{
		return this.paddleService.getPaddles()
	}
	
	@Get('/:paddleId')
	getPaddleById(
		@Param('paddleId') paddleId: string
	) : CreatePaddleDto {
		return this.paddleService.getPaddleById(paddleId)
	}

	@Post()
		createPaddle(
			@Body() body : UpdatePaddleDto
	) : CreatePaddleDto {
		return this.paddleService.createPaddle(body)
	}

	@Put('/:paddleId')
	updatePaddle(
		@Param('paddleId') paddleId : string,
		@Body() body : UpdatePaddleDto
	) : CreatePaddleDto{
			return this.paddleService.updatePaddle(body, paddleId)
	}
}
