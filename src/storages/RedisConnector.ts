import { AbstractConnector } from './AbstractConnector';
import { Email } from '../models/data/Email';
import * as redis from 'redis'

export class RedisConnector extends AbstractConnector {
    private redisClient: any

    constructor(redisClient: redis.RedisClient) {
        super()
        this.redisClient = redisClient
    }

    public async addEmailInfo(email: Email): Promise<Email> {
        const num: number = await this.redisClient.existsAsync(email.email)
        if (num === 0) {
            await this.redisClient.setAsync(email.email, JSON.stringify(email))
        }
        return email
    }

    public async getEmailInfo(email: string): Promise<Email | null> {
        const emails: string[] = await this.redisClient.mgetAsync(email)

        if (emails.length && emails[0] !== null) {
            const mail = JSON.parse(emails[0]) as Email
            mail.alreadyInDatabase = true
            return mail
        }
        return null
    }
}
