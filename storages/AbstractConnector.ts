import { Email } from "../models/data/Email";

export abstract class AbstractConnector {
    public async init(){

    }

    public async getEmailInfo(email : string) : Promise<Email> {
        return 
    }

    public async addEmailInfo(email : Email) : Promise<Email>{
        return
    }
}