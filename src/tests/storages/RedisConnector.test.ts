import { expect } from 'chai'
import 'mocha';
import {RedisConnector} from '../../storages/RedisConnector'
import * as redis from 'redis'
import * as bluebird from 'bluebird'
import { Email } from '../../models/data/Email'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const emailToTest = 'damien@marchand.fr'
let redisConnector: RedisConnector

const redisClient = redis.createClient({
    host : 'redis',
    db : '6'
})

describe('Test Redis connector : ', () => {

    before(async () => {
        redisConnector = new RedisConnector(redisClient)
    })

    beforeEach(async () => {
        await (redisClient as any).flushdbAsync()
    })

    it('should return null if email not saved un database', async () => {
        const result = await redisConnector.getEmailInfo(emailToTest)
        expect(result).to.be.null
    })

    it('should add an email if not exists in database', async () => {
        let result = await redisConnector.getEmailInfo(emailToTest)
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
        await redisConnector.addEmailInfo(email)
        result = await redisConnector.getEmailInfo(emailToTest)
        for (const key of Object.keys(email)) {
            expect((result as any)[key]).to.eql((email as any)[key])
        }
    })
});
