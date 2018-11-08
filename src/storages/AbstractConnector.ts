import { Email } from '../models/data/Email';

export abstract class AbstractConnector {

    public async getEmailInfo(email: string): Promise<Email | null> {
        return new Email(email)
    }

    public async addEmailInfo(email: Email): Promise<Email> {
        return new Email('toto@toto.com')
    }
}
