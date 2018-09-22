import { AbstractConnector } from "./AbstractConnector";
import { MongoClient, Db } from "mongodb";
import { Email } from "../models/data/Email";

export class MongoConnector extends AbstractConnector {
    private config : IMongoConnectorConfig

    private db : Db = {} as Db
    
    constructor(config : IMongoConnectorConfig){
        super()
        this.config = config
    }

    async init(){ 
        const mongoClient = await MongoClient.connect(this.config.url)      
        this.db = mongoClient.db(this.config.dbName)
    }

    async getEmailInfo(email : string) : Promise<Email> {
        const emailFromDb = await this.db.collection('emails').findOne({email}) as Email
        // Update email in database
        await this.db.collection('emails').updateOne({email},{lastReadDate : new Date(),numberOfrequests : emailFromDb.numberOfrequests++})
        return emailFromDb
    }

    async addEmailInfo(email : Email) : Promise<Email>{
        await this.db.collection('email').update({email},email,{upsert : true})
        return email
    }
}

export interface IMongoConnectorConfig {
    url : string
    dbName : string
}