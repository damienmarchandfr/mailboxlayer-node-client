import { AbstractConnector } from './AbstractConnector';
import { MongoClient, Db } from 'mongodb';
import { Email } from '../models/data/Email';

export class MongoConnector extends AbstractConnector {
    private config: IMongoConnectorConfig

    private db: Db = {} as Db
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
        const emailFromDb = await this.db.collection('emails').findOne({email}) as Email

        return emailFromDb
    }

    public async addEmailInfo(email: Email): Promise<Email> {
        if (!this.initialized) {
            await this.init()
        }
        await this.db.collection('emails').save(email)
        return email
    }

    private async init() {
        const mongoClient = await MongoClient.connect(this.config.url, { useNewUrlParser: true })
        this.db = mongoClient.db(this.config.dbName)
    }
}

export interface IMongoConnectorConfig {
    url: string
    dbName: string
}
