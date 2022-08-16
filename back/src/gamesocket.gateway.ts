import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody
} from '@nestjs/websockets'

@WebSocketGateway({ namespace: 'game' })

export class GameSocketGateway{
    @SubscribeMessage('game')
    handleEvent(@MessageBody() data: string): string {
        return data;
    }

}