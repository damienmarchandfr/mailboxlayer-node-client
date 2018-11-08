import { AbstractConnector } from './AbstractConnector';
import { Collection } from 'mongodb';
import { Email } from '../models/data/Email';

export class MongoConnector extends AbstractConnector {

    private collection: Collection

    constructor(collection: Collection) {
        super()
        this.collection = collection
    }

    public async getEmailInfo(email: string): Promise<Email | null> {
        const emailFromDb = await this.collection.findOne({email}) as Email

        if (emailFromDb !== null) {
            emailFromDb.alreadyInDatabase = true
        }

        return emailFromDb
    }

    public async addEmailInfo(email: Email): Promise<Email> {
        await this.collection.updateOne({email : email.email}, {$set : email} , {upsert : true})
        return email
    }
}
