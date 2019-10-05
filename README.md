## MailBoxLayer Node Client

[![Build Status](https://travis-ci.com/damienmarchandfr/mailboxlayer-node-client.svg?branch=master)](https://travis-ci.com/damienmarchandfr/mailboxlayer-node-client)

This library can be used to get email information.
To get faster results, it is possible to enable the cache feature to store 1st-request email information in a database. This allows to reduce the number of API calls. 
It uses the MailBoxLayer API: https://mailboxlayer.com

## Installation


    yarn add mailboxlayer-node-client


or

    npm install mailboxlayer-node-client --save


## Configuration

Before using the mailboxlayer API client, set up your account and obtain your API Access Key.
To get your Access Key, sign up at https://mailboxlayerlayer.com/product

## SETUP

MailboxLayer constructor has an IConfig parameter:

    interface  IConfig {
	    // Given by mailbox after registration (Required) 
	    accessKey:  string
	    // If you want the API to perform SMTP checks (Required)
	    smtp:  boolean
	    //  The real-time verification process of the MailBoxLayer API does not end with one /// SMTP check (Required) 
	    catchAll:  boolean
	    // http or https (Required)
	    secure:  boolean
	    // If you want to use a database to save API responses (Optional)
	    cache?:  boolean
	    // Database connector (Required if cache === true)
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

With cache, you can use the following types of storage:
 - Memory (do not use in production)
 - Files (do not use in production)
 - MongoDB [npm link](https://www.npmjs.com/package/mongodb)
 - Redis (with bluebird) [npm link](https://www.npmjs.com/package/redis)

For example, with MongoDB: (you can find more examples in the /examples directory)

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

## Response

The following lines show the object returned after an API request (Email class):

    {
        // Email to test
        email: string
        // Alternative email suggestion 
        didYouMean: string = ''
        // "paul" in "paul@company.com'
        user: string = ''
        // "company.com" in "paul@company.com"
        domain: string = ''
        // Depends on whether the general syntax of the requested email address is valid or not 
        formatValid: boolean = true
        // Depends on whether MX-Records for the requested domain could be found or not 
        mxFound: boolean = true
        // Depends on whether the SMTP check of the requested email address succeeded or not
        smtpChecked: boolean = true
        // Depends on whether the requested email address is found to be part of a catch-all mailbox or not
        catchAll: boolean = true
        // Depends on whether the requested email address is a role email address or not. (true if support@yop.com)
        role: boolean = true
        // Depends on whether the requested email address is a disposable email address or not
        disposable: boolean = false
        // Depends on whether the requested email address is a free email address or not
        free: boolean = true
        // Reflects the quality and deliverability of the requested email address
        score: number = 1
		// Result from cache or not
		alreadyInDatabase : boolean = false
    }

Email class has the following methods:

    canBeUseForTransactions()
    canbeUsedForMarketing()
    

## Stop Callbacks! Use Promises

This library does not use callback. Use promise instead.

## Tests

In order to run the tests mongoDB and Redis must be installed.

    yarn run test

or

    npm run test

## Connectors that can be used with this library

![files](https://image.ibb.co/g6hypK/if_Artboard_9_2993435.png)

![redis](https://image.ibb.co/hRz07U/redis.png)

![mongodb](https://image.ibb.co/cYYhMp/mongodb.png)
