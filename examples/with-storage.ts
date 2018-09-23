import {MailBoxLayer} from '..'
import {accessKey} from './config'
import { MongoConnector } from '../storages/MongoConnector'
import * as redis from 'redis'

import * as bluebird from 'bluebird'
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

import { RedisConnector } from '../storages/RedisConnector';

// const connector = new MongoConnector({
//     dbName : 'testemail',
//     url : 'mongodb://localhost:27017'
// })

// new Promise((resolve) => {resolve()})
// .then(async () => {
//     try {
//         const mailBoxLayer = new MailBoxLayer({
//             accessKey, smtp : true,
//             catchAll : true,
//             secure : false,
//             cache : true, connector
//         })
//         const email = await mailBoxLayer.getInformations('zynefaty@duck2.club')
//         console.log(email)
//     } catch (error) {
//         console.error(error)
//     }
// })

const redisClient = redis.createClient({
    db : '6'
})
const redisConnector = new RedisConnector(redisClient)

new Promise((resolve) => {resolve()})
.then(async () => {
    try {
        const mailBoxLayer = new MailBoxLayer({
            accessKey, smtp : true,
            catchAll : true,
            secure : false,
            cache : true, connector: redisConnector
        })
        const email = await mailBoxLayer.getInformations('zynefaty@duck2.club')
    } catch (error) {
        console.error(error)
    }
})
