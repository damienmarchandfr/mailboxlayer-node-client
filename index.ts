import { IConfig } from './models/IConfig';
import * as rp from 'request-promise'
import { IApiResponse, Response, IApiResponseError } from './models/IResponse';
import { MailBoxLayerError } from './models/errors/MailBoxLayer.error';

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

    async getInformations(email : string) : Promise<Response> {
        const options = {
            uri: this.generateApiUrl(email),
            json: true
        }
        
        // Check if email already in database


        // If not in database make an API request


        // Save in database
        
        

        const apiResponse : any = await rp(options)

        // Got error
        if(apiResponse.hasOwnProperty('success')){
            throw new MailBoxLayerError(apiResponse as IApiResponseError)
        }

        // Convert to Response
        return new Response(apiResponse as IApiResponse)
    }
}