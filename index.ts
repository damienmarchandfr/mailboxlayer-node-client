import { IConfig } from './models/IConfig';
import * as rp from 'request-promise'
import { IApiResponse, IApiResponseError } from './models/IResponse';
import { MailBoxLayerError } from './models/errors/MailBoxLayer.error';
import { Email } from './models/data/Email';
import { isRegExp } from 'util';

export class MailBoxLayer {
    private config : IConfig

    constructor(config : IConfig){
        if(config.cache && !config.connector){
            throw new Error('If cache is true you muste provide a connector')
        }
        this.config = config
    }

    private generateApiUrl(email : string) : string{
        const protocol = this.config.secure ? 'https://' : 'http://'
        return protocol + 'apilayer.net/api/check?access_key='+this.config.accessKey+'&email='+email+'&smtp='+(this.config.smtp ? 1 : 0)
    }

    async getInformations(email : string) : Promise<Email> {
        const options = {
            uri: this.generateApiUrl(email),
            json: true
        }

        if(this.config.cache && this.config.connector){
            const emailFromDb = await this.config.connector.getEmailInfo(email)
            if(emailFromDb){
                return emailFromDb
            }
        }

        // If not in database or no storage given make an API request
        const apiResponse = await rp(options)

        if(apiResponse.hasOwnProperty('success')){
            throw new MailBoxLayerError(apiResponse as IApiResponseError)
        }

        const emailFromApi = new Email(email)
        emailFromApi.fromAPIResponse(apiResponse as IApiResponse)

        // Save in database
        if(this.config.cache && this.config.connector){
            await this.config.connector.addEmailInfo(emailFromApi)
        }     
        
        return emailFromApi
    }
}