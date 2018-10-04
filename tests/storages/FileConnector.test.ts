import { expect } from 'chai'
import 'mocha';
import { Email } from '../../models/data/Email';
import { FileConnector } from '../../storages/FileConnector';
import * as fs from 'fs-extra'
import * as rimraf from 'rimraf'

const emailToTest = 'damien@marchand.fr'
let fileConnector: FileConnector

const emailResponse: Email = {
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

let counter = 0

describe('Test File connector : ', () => {

    before(async () => {
        fileConnector = new FileConnector('./temp')
    })

    after(async () => {
        await new Promise((resolve) => {
            rimraf('./temp', (err) => {
                resolve()
            })
        })
    })

    beforeEach(async () => {
       let  errorDelete = new Error()

       // Delete folder
       try {
        await new Promise((resolve, reject) => {
            rimraf('./temp', (err) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })
       } catch (error) {
            errorDelete = error
       }

       if (counter === 0) {
           expect(errorDelete.message).not.to.be.undefined
       } else {
            expect(errorDelete.message).to.be.empty
       }

       let errorAccess: Error = new Error()
       try {
            await fs.access('./temp')
        } catch (error) {
            errorAccess = error
        }

       expect(errorAccess.message).not.to.be.undefined
       counter++
    })

    it('should create the folder and file', async () => {
        await fileConnector.addEmailInfo(emailResponse)

        let errorNotExists = new Error()

        try {
            await fs.access('./temp/' + emailResponse.email)
        } catch (error) {
            errorNotExists = error
        }

        expect(errorNotExists.message).to.be.empty
    })

    it('should return null if email not saved in database', async () => {
        const result = await fileConnector.getEmailInfo(emailToTest)
        expect(result).to.be.null
    })

    it('should add an email if not exists in database', async () => {
        let result = await fileConnector.getEmailInfo(emailToTest)
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
        await fileConnector.addEmailInfo(email)

        // File exists
        await fs.access('./temp/' + email.email)

        result = await fileConnector.getEmailInfo(emailToTest)
        for (const key of Object.keys(email)) {
            expect((result as any)[key]).to.eql((email as any)[key])
        }
    })

    it('should creae 2 files. One for each email', async () => {
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
        await fileConnector.addEmailInfo(email)
        email.email = 'damien@github.fr'
        await fileConnector.addEmailInfo(email)

        const files: string[] = await fs.readdir('./temp')
        expect(files.length).to.eql(2)
    })
});
