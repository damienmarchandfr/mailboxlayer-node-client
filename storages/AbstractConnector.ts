import { Email } from '../models/data/Email';

export abstract class AbstractConnector {

    public async getEmailInfo(email: string): Promise<Email> {
        return new Email('toto@toto.com')
    }

    public async addEmailInfo(email: Email): Promise<Email> {
        return new Email('toto@toto.com')
    }
}
