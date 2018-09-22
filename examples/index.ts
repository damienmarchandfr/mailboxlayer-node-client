import {MailBoxLayer} from '../index'
import {accessKey} from './config'
// Without storage
const mailBoxLayer = new MailBoxLayer({accessKey,smtp : true, catchAll : true,secure : false})

mailBoxLayer.getInformations('zynefaty@duck2.club').then(email=>{
    console.log(email)
})
.catch(err=>{
    console.error(err)
})