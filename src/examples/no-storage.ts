import {MailBoxLayer} from '..'

// Without storage
const mailBoxLayer = new MailBoxLayer({accessKey : 'your_access_key', smtp : true, catchAll : true, secure : false})

mailBoxLayer.getInformations('zynefaty@duck2.club').then(email => {
    console.log(email)
})
.catch(err => {
    console.error(err)
})
