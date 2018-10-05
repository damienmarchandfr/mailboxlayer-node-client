import { AbstractConnector } from './AbstractConnector';
import { Email } from '../models/data/Email';
export declare class FileConnector extends AbstractConnector {
    private path;
    constructor(path: string);
    addEmailInfo(email: Email): Promise<Email>;
    getEmailInfo(email: string): Promise<Email | null>;
    private creaeFolder;
}
