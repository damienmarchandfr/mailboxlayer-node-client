## MailBoxLayer Node Client

This typeSript library can be used to get email informations.
You can enable cache and stores them in database to make less request to the API.
It uses MailBoxLayer API : https://mailboxlayer.com

## Installation

yarn add mailboxlayer-node-client

or 

npm install mailboxlayer-node-client --save

## Configuration

Before using the mailboxlayer API client you have to setup your account and obtain your API Access Key.
You can get it by signing up at https://mailboxlayerlayer.com/product.


## Without cache



## Stop Callbacks ! Use Promises

This lib do not use callback. Use promise instead

## Tests

In order to run the tests, no environment variables needs to be set.
Docker must be installed in your machine.

yarn run test:docker

or 

npm run test:docker

## Connectors that can be used with this lib
![mongo-logo](./assets/mongodb.png )
![redis-logo](./assets/redis.png )
