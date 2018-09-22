import { AbstractConnector } from "./AbstractConnector";
import { MongoClient, Db } from "mongodb";

export class MongoConnector extends AbstractConnector {
    private config : IMongoConnectorConfig

    private db : Db
    private initialized = false
    
    constructor(config : IMongoConnectorConfig){
        super()
        this.config = config
    }

    async init(){
        this.initialized = true  
        const mongoClient = await MongoClient.connect(this.config.url)      
        this.db = mongoClient.db(this.config.dbName)
    }
}

export interface IMongoConnectorConfig {
    url : string
    dbName : string
}