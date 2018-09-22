export class Response {
    email : string
    didYouMean : string
    user : string
    domain : string
    formatValid: boolean
    mxFound : boolean
    smtpChecked : boolean
    catchAll : boolean
    role : boolean
    disposable : boolean
    free : boolean
    score : number

    constructor(apiResponse : IApiResponse){
        this.email = apiResponse.email
        this.didYouMean = apiResponse.did_you_mean || ''
        this.user = apiResponse.user || ''
        this.domain = apiResponse.domain || ''
        this.formatValid = apiResponse.format_valid
        this.mxFound = apiResponse.mx_found
        this.smtpChecked = apiResponse.smtp_check
        this.catchAll = apiResponse.catch_all
        this.role = apiResponse.role
        this.disposable = apiResponse.disposable
        this.free = apiResponse.free
        this.score = apiResponse.score
    }

    public isTemp() : boolean {
        return this.disposable
    }
}

export class ResponseError {
    success: boolean
    error: {
        code: number
        type: string
        info: string
    }

    constructor(apiResponseError : IApiResponseError){
        this.success = apiResponseError.success
        this.error = apiResponseError.error
    }
}

export interface IApiResponse {
    email: string
    did_you_mean?: string
    user?: string
    domain?: string
    format_valid: boolean,
    mx_found?: boolean,
    smtp_check?: boolean,
    catch_all?: boolean,
    role?: boolean,
    disposable: boolean,
    free?: boolean,
    score: number
}

export interface IApiResponseError {
    success: false,
    error: {
        code: number
        type: string
        info: string
    }
}

