import { expect } from 'chai'
import 'mocha';
import { Email } from '../../models/data/Email';
import { MemoryConnector } from '../../storages/MemoryConnector';

const emailToTest = 'damien@marchand.fr'
let memoryConnector: MemoryConnector

describe('Test Memory connector : ', () => {

    before(async () => {
        memoryConnector = new MemoryConnector()
    })

    beforeEach(async () => {
        memoryConnector.emails = []
    })

    it('should return null if email not saved in database', async () => {
        const result = await memoryConnector.getEmailInfo(emailToTest)
        expect(result).to.be.null
    })

    it('should add an email if not exists in database', async () => {
        let result = await memoryConnector.getEmailInfo(emailToTest)
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
        await memoryConnector.addEmailInfo(email)
        result = await memoryConnector.getEmailInfo(emailToTest)
        for (const key of Object.keys(email)) {
            expect((result as any)[key]).to.eql((email as any)[key])
        }
    })

    it('should not save duplicate emails in database', async () => {
        const result = await memoryConnector.getEmailInfo(emailToTest)
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
        await memoryConnector.addEmailInfo(email)
        await memoryConnector.addEmailInfo(email)
        const count = memoryConnector.emails.length
        expect(count).to.eql(1)
    })
});
