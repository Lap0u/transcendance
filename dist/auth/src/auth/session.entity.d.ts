import { ISession } from 'connect-typeorm';
export declare class TypeOrmSession implements ISession {
    expiredAt: number;
    id: string;
    destroyedAt?: Date;
    json: string;
}
