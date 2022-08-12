import { Controller, Get, Put, Param, Body, Post } from "@nestjs/common";

@Controller('paddle')
export class PaddleController {
	@Get() 
	getPaddles(){
		return "TestPaddles"
	}
	
	@Get('/:paddleId')
	getPaddleById(
		@Param('paddleId') paddleId: number
	){
		console.log(paddleId);
		return "Created"
	}

	@Post()
		createPaddle(
			@Body() body
	) {
		return "Create Paddle"
	}

	@Put()
	updatePaddle(
		@Param('paddleId') paddleId : number,
		@Body() body
	){
		return "Updated"
	}
}
