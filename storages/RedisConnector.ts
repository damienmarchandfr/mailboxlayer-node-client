import { AbstractConnector } from './AbstractConnector';
import { Email } from '../models/data/Email';
import * as redis from 'redis'

export class RedisConnector extends AbstractConnector {
    private redisClient: redis.RedisClient

    constructor(redisClient: redis.RedisClient) {
        super()
        this.redisClient = redisClient
    }

    public async addEmailInfo(email: Email): Promise<Email> {
        const exists = await this.redisClient.exists(email.email)
        if (!exists) {
            await this.redisClient.set(email.email, JSON.stringify(email))
        }
        return email
    }

    public async getEmailInfo(email: string): Promise<Email | null> {
        const data = await this.redisClient.get(email)
        if (data) {
            return JSON.parse(data as any) as Email
        }
        return null
    }
}
