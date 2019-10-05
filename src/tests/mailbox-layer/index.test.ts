import { expect } from 'chai'
import 'mocha';
import * as rp from 'request-promise'
import * as sinon from 'sinon'
import { MailBoxLayer } from '../..';
import { MemoryConnector } from '../../storages/MemoryConnector';
import { Email } from '../../models/data/Email';

const apiResponse: any = {
    email: 'support@apilayer.com',
    did_you_mean: '',
    user: 'support',
    domain: 'apilayer.net',
    format_valid: true,
    mx_found: true,
    smtp_check: true,
    catch_all: false,
    role: true,
    disposable: false,
    free: false,
    score: 0.8
}

const apiResponseError: any = {
  success: false,
  error: {
    code: 210,
    type: 'no_email_address_supplied',
    info: 'Please specify an email address. [Example: support@apilayer.com]'
  }
}

let mailBoxLayer: MailBoxLayer
let mailBoxLayerWithCache: MailBoxLayer
let stub: sinon.SinonStub

const memoryConnector = new MemoryConnector()

describe('Test MailBoxLayer class', () => {
    before(() => {
        stub = sinon.stub(rp, 'get').resolves(apiResponse)

        mailBoxLayer = new MailBoxLayer({
            accessKey : 'fdfjskl',
            cache : false,
            catchAll : false,
            secure : false,
            smtp : false
        })

        mailBoxLayerWithCache = new MailBoxLayer({
            accessKey : 'fdfjskl',
            cache : true,
            catchAll : false,
            secure : false,
            smtp : false,
            connector : memoryConnector
        })
    })

    afterEach(() => {
        memoryConnector.emails = []
        stub.restore()
        stub = sinon.stub(rp, 'get').resolves(apiResponse)
    })

    it('should return mail info like api response in camel case', async () => {

        const info: Email = await mailBoxLayer.getInformations('damien@marchand.fr')
        const emailInfo = {
            email: 'support@apilayer.com',
            didYouMean: '',
            user: 'support',
            domain: 'apilayer.net',
            formatValid: true,
            mxFound: true,
            catchAll: false,
            role: true,
            disposable: false,
            free: false,
            score: 0.8,
            smtpChecked : true,
            alreadyInDatabase : false
        }

        expect(JSON.parse(JSON.stringify(info))).to.eql(emailInfo)
    })

    it('should return result for transaction check and marketing', async () => {
        const info: Email = await mailBoxLayer.getInformations('damien@marchand.fr')

        expect(info.canbeUsedForMarketing()).to.be.true
        expect(info.canbeUsedForMarketing()).to.be.true

        info.score = 0.3
        expect(info.canbeUsedForMarketing()).to.be.false
        expect(info.canbeUsedForMarketing()).to.be.false
    })

    it('should throw error if API error', async () => {
        stub.restore()
        sinon.stub(rp, 'get').resolves(apiResponseError)

        let error: any = {}

        try {
            await mailBoxLayer.getInformations('damien@marchand.fr')
        } catch (err) {
            error = err
        }

        expect(error.code).to.eql(apiResponseError.error.code)
    })

    it('should return already in database === true if saved in database', async () => {
        let info: Email = await mailBoxLayerWithCache.getInformations('support@apilayer.com')
        expect(info.alreadyInDatabase).to.be.false

        info = await mailBoxLayerWithCache.getInformations('support@apilayer.com')
        expect(info.alreadyInDatabase).to.be.true
    })
});
