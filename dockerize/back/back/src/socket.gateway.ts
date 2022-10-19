import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { throws } from 'assert';
import { Server, Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { AccountService } from './account/account/account.service';
import { Accounts } from './account/entities/accounts.entity';
import { MatchmakingService } from './matchmaking/matchmaking.service';
import { SocketService } from './socket/socket.service';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private socketService: SocketService) {}
  @Inject(MatchmakingService)
  private readonly matchmakingService: MatchmakingService;
  @Inject(AccountService)
  private readonly userService: AccountService;
  @WebSocketServer() public server: Server;

  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.userService.deleteUsertoOnlineList(client.id);
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    const userService = this.userService;
    client.on('clientConnected', async function (data) {
      await userService.addUsertoOnlineList(client.id, data.account_id);
    });
  }

  @SubscribeMessage(`paddleMove`)
  handlePaddleMove(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): any {
    this.matchmakingService.updatePosX(data, client.id);

    return data;
  }

  @SubscribeMessage(`pong`)
  handlePong(@ConnectedSocket() client: Socket): any {
    this.matchmakingService.handlePong(client.id);
  }

  @SubscribeMessage('leave')
  handleQuit(@ConnectedSocket() client: Socket): any {
    this.matchmakingService.handleQuit(client.id);
  }
}
