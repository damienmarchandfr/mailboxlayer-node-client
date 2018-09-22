import { AbstractConnector } from './AbstractConnector';
import { MongoClient, Db, Collection } from 'mongodb';
import { Email } from '../models/data/Email';

export class MongoConnector extends AbstractConnector {

    public collectionName = 'emails'

    private collection: Collection<any> = {} as Collection
    private db: Db = {} as Db
    private config: IMongoConnectorConfig
    private initialized: boolean

    constructor(config: IMongoConnectorConfig) {
        super()
        this.config = config
        this.initialized = false
    }

    public async getEmailInfo(email: string): Promise<Email> {
        if (!this.initialized) {
            await this.init()
        }
        const emailFromDb = await this.collection.findOne({email}) as Email

        return emailFromDb
    }

    public async addEmailInfo(email: Email): Promise<Email> {
        if (!this.initialized) {
            await this.init()
        }
        await this.collection.updateOne({email : email.email}, {$set : email} , {upsert : true})
        return email
    }

    private async init() {
        const mongoClient = await MongoClient.connect(this.config.url, { useNewUrlParser: true })
        this.db = mongoClient.db(this.config.dbName)
        this.collection = this.db.collection(this.collectionName)
    }
}

export interface IMongoConnectorConfig {
    url: string
    dbName: string
}
