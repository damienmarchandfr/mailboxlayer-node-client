import { AbstractConnector } from './AbstractConnector';
import { Collection } from 'mongodb';
import { Email } from '../models/data/Email';
export declare class MongoConnector extends AbstractConnector {
    private collection;
    constructor(collection: Collection);
    getEmailInfo(email: string): Promise<Email | null>;
    addEmailInfo(email: Email): Promise<Email>;
}
