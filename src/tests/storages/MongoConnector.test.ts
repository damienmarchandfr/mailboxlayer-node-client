import { expect } from 'chai'
import 'mocha';
import { MongoConnector } from '../../storages/MongoConnector';
import { MongoClient, Db, Collection } from 'mongodb';
import {mongoConfig} from '../config'
import { Email } from '../../models/data/Email';

const emailToTest = 'damien@marchand.fr'
let mongoConnector: MongoConnector
let mongoCollection: Collection

describe('Test Mongo connector : ', () => {

    before(async () => {
        const mongoClient = await MongoClient.connect(mongoConfig.serverUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = mongoClient.db(mongoConfig.databaseName)
        mongoCollection = db.collection('email')
        mongoConnector = new MongoConnector(mongoCollection)
    })

    beforeEach(async () => {
        await mongoCollection.deleteMany({})
    })

    it('should return null if email not saved un database', async () => {
        const result = await mongoConnector.getEmailInfo(emailToTest)
        expect(result).to.be.null
    })

    it('should add an email if not exists in database', async () => {
        let result = await mongoConnector.getEmailInfo(emailToTest)
        expect(result).to.be.null
        const email = {
            email : emailToTest,
            catchAll : true,
            didYouMean : 'damien@damien.fr',
            disposable : false,
            domain : 'marchand.fr',
            formatValid : true,
            free : true,
            mxFound : true,
            role : true,
            score : 1,
            smtpChecked : true,
            user : 'damien'
        } as Email
        await mongoConnector.addEmailInfo(email)
        result = await mongoConnector.getEmailInfo(emailToTest)
        for (const key of Object.keys(email)) {
            expect((result as any)[key]).to.eql((email as any)[key])
        }
    })

    it('should not save duplicate emails in database', async () => {
        const result = await mongoConnector.getEmailInfo(emailToTest)
        expect(result).to.be.null
        const email = {
            email : emailToTest,
            catchAll : true,
            didYouMean : 'damien@damien.fr',
            disposable : false,
            domain : 'marchand.fr',
            formatValid : true,
            free : true,
            mxFound : true,
            role : true,
            score : 1,
            smtpChecked : true,
            user : 'damien'
        } as Email
        await mongoConnector.addEmailInfo(email)
        await mongoConnector.addEmailInfo(email)
        const count = await mongoCollection.countDocuments({email : emailToTest})
        expect(count).to.eql(1)
    })
});
