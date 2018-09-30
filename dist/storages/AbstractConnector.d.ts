import { Email } from '../models/data/Email';
export declare abstract class AbstractConnector {
    getEmailInfo(email: string): Promise<Email | null>;
    addEmailInfo(email: Email): Promise<Email>;
}
