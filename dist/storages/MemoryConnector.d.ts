import { AbstractConnector } from './AbstractConnector';
import { Email } from '../models/data/Email';
export declare class MemoryConnector extends AbstractConnector {
    emails: Email[];
    constructor();
    getEmailInfo(email: string): Promise<Email | null>;
    addEmailInfo(email: Email): Promise<Email>;
}
