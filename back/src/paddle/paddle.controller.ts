import { Controller, Get, Put, Param, Body, Post } from "@nestjs/common";
import { CreatePaddleDto } from "./paddle.dto";
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
		@Param('paddleId') paddleId: number
	) : CreatePaddleDto {
		return "Created"
	}

	@Post()
		createPaddle(
			@Body() body : CreatePaddleDto
	) : CreatePaddleDto {
		return "Create Paddle"
	}

	@Put()
	updatePaddle(
		@Param('paddleId') paddleId : number,
		@Body() body : CreatePaddleDto
	) : CreatePaddleDto{
		return "Updated"
	}
}
