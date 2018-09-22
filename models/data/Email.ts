import { IApiResponse } from "../IResponse";

export class Email {
    email : string
    
    lastReadDate : Date
    lastUpdateDate : Date
    creationDate : Date

    numberOfrequests : number

    didYouMean : string
    user: string
    domain : string
    formatValid: boolean
    mxFound : boolean
    smtpChecked : boolean
    catchAll : boolean
    role : boolean
    disposable : boolean
    free : boolean
    score : number

    constructor(email : string){
        this.email = email
    }

    fromAPIResponse(apiResponse : IApiResponse){
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


}