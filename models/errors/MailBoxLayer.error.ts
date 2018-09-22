import { IApiResponseError } from '../IResponse';

const errors: any = {
    404	 : '404 not found'	,
    101	 : 'missing access key or invalid access key',
    103	 : 'invalid api function',
    104	 : 'usage limit reached',
    210	 : 'no email address supplied',
    105	 : 'https access restricted',
    106	 : 'rate limit reached'	,
    102	 : 'inactive user',
    310	 : 'catch all access restricted',
    999	 : 'timeout'
}

export class MailBoxLayerError extends Error {
    public apiResponseError: IApiResponseError
    public code: number

    constructor(apiResponse: IApiResponseError) {
        super(apiResponse.error.info)
        this.code = errors[apiResponse.error.code]
        this.apiResponseError = apiResponse
    }
}
