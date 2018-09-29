## MailBoxLayer Node Client

This TypeSript library can be used to get email informations.
You can enable cache and store email informations  in database to make less request to the API and get results faster.
It uses MailBoxLayer API : https://mailboxlayer.com

## Installation


    yarn add mailboxlayer-node-client


or

    npm install mailboxlayer-node-client --save


## Configuration

Before using the mailboxlayer API client you have to setup your account and obtain your API Access Key.
You can get it by signing up at https://mailboxlayerlayer.com/product.

## SETUP

MailboxLayer constructor have a IConfig parameter

    interface  IConfig {
	    // Required : Given by mailbox after registration
	    accessKey:  string
	    // Required : if you want the API to perform SMTP checks
	    smtp:  boolean
	    // Required : The mailboxlayer API's real-time verification process does not end with one 			    SMTP check ( lower if true )
	    catchAll:  boolean
	    // Required : http or https
	    secure:  boolean
	    // If you want to use database to save api response
	    cache?:  boolean
	    // Database connector ( required if cache === true )
	    connector?:  AbstractConnector
    }

## Without cache

    import {MailBoxLayer} from  '..'
	import {accessKey} from  './config'

	const  mailBoxLayer  =  new  MailBoxLayer(
		{
			accessKey, smtp :  true, 
			catchAll :  true, 
			secure :  false
		})

	mailBoxLayer.getInformations('zynefaty@duck2.club')
		.then(email  => {
			// All your email information
			console.log(email)
		})
		.catch(err  => {
			console.error(err)
		})


## With cache

You can use :

 - Memory ( do not use in production )
 - MongoDB [npm link](https://www.npmjs.com/package/mongodb)
 - Redis	[npm link](https://www.npmjs.com/package/redis)

For example with MongoDB : ( you can find examples in /exemples directory )

	    new  Promise((resolve) => {resolve()})
		    .then(async () => {
			    const  mongoClient  =  await  MongoClient.connect(mongoConfig.serverUrl, { useNewUrlParser:  true })
			    const  db  =  mongoClient.db(mongoConfig.databaseName)
		        const  mongoCollection  =  db.collection('email')
			    const  mongoConnector  =  new  MongoConnector(mongoCollection)
			    
			    try {
				    const  mailBoxLayer  =  new  MailBoxLayer({
					    accessKey, smtp :  true,
					    catchAll :  true,
					    secure :  false,
					    cache :  true,
					    connector :  mongoConnector
				    })
				    const  email  =  await  mailBoxLayer.getInformations('zynefaty@duck2.club')
				    console.log(email)
		    } catch (error) {
			    console.error(error)
		    }
	    })

## Stop Callbacks ! Use Promises

This lib do not use callback. Use promise instead

## Tests

In order to run the tests, no environment variables needs to be set. ( Docker must be installed ) 

    yarn run test:docker

or

    npm run test:docker

## Connectors that can be used with this lib

![redis](https://image.ibb.co/hRz07U/redis.png)

![mongodb](https://image.ibb.co/cYYhMp/mongodb.png)

