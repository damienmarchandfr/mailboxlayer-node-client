import {MailBoxLayer} from '..'
import {accessKey, mongoConfig} from './config'
import * as redis from 'redis'

import * as bluebird from 'bluebird'
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

import { RedisConnector } from '../storages/RedisConnector';
import { MongoClient } from 'mongodb';
import { MongoConnector } from '../storages/MongoConnector';
import { MemoryConnector } from '../storages/MemoryConnector';

const redisClient = redis.createClient({
    db : '6'
})
const redisConnector = new RedisConnector(redisClient)

const memoryConnector = new MemoryConnector()

// ----------------- MONGO -------------------
new Promise((resolve) => {resolve()})
.then(async () => {
    const mongoClient = await MongoClient.connect(mongoConfig.serverUrl, { useNewUrlParser: true })
    const db = mongoClient.db(mongoConfig.databaseName)
    const mongoCollection = db.collection('email')
    const mongoConnector = new MongoConnector(mongoCollection)
    try {
        const mailBoxLayer = new MailBoxLayer({
            accessKey, smtp : true,
            catchAll : true,
            secure : false,
            cache : true,
            connector : mongoConnector
        })
        const email = await mailBoxLayer.getInformations('zynefaty@duck2.club')
        console.log(email)
    } catch (error) {
        console.error(error)
    }
})

// ------------------ REDIS ------------------

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
        console.log(email)
    } catch (error) {
        console.error(error)
    }
})

// --------------- MEMORY -------------------
// Do not use memory for production )

new Promise((resolve) => {resolve()})
.then(async () => {
    try {
        const mailBoxLayer = new MailBoxLayer({
            accessKey, smtp : true,
            catchAll : true,
            secure : false,
            cache : true, connector: memoryConnector
        })
        const email = await mailBoxLayer.getInformations('zynefaty@duck2.club')
        console.log(email)
    } catch (error) {
        console.error(error)
    }
})
