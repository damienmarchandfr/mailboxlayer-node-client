import { AbstractConnector } from './AbstractConnector';
import { Email } from '../models/data/Email';

export class MemoryConnector extends AbstractConnector {
    public emails: Email[]

    constructor() {
        super()
        console.info('Do not use memory connector in production')
        this.emails = []
    }

    public async getEmailInfo(email: string): Promise<Email | null> {
        const result = this.emails.filter(emailFromStorage => {
            return emailFromStorage.email === email
        })

        if (result.length) {
            return result[0]
        }
        return null
    }

    public async addEmailInfo(email: Email): Promise<Email> {
        const info  = await this.getEmailInfo(email.email)
        if (info === null ) {
            this.emails.push(email)
        }
        return email
    }
}
