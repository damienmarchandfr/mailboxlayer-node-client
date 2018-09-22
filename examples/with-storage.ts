import {MailBoxLayer} from '..'
import {accessKey} from './config'
import { MongoConnector } from '../storages/MongoConnector';

const connector = new MongoConnector({
    dbName : 'testemail',
    url : 'mongodb://localhost:27017'
})

new Promise(resolve => {resolve()})
.then(async () => {
    try {
        const mailBoxLayer = new MailBoxLayer({
            accessKey, smtp : true,
            catchAll : true,
            secure : false,
            cache : true, connector
        })
        const email = await mailBoxLayer.getInformations('zynefaty@duck2.club')
        console.log(email)
    } catch (error) {
        console.error(error)
    }
})
