import { AbstractConnector } from './AbstractConnector';
import { Email } from '../models/data/Email';
import * as redis from 'redis';
export declare class RedisConnector extends AbstractConnector {
    private redisClient;
    constructor(redisClient: redis.RedisClient);
    addEmailInfo(email: Email): Promise<Email>;
    getEmailInfo(email: string): Promise<Email | null>;
}
