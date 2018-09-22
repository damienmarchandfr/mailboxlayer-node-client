import { IApiResponse } from "../IResponse";

export class Email {
    email : string
    
    lastReadDate : Date = new Date()
    creationDate : Date = new Date()

    numberOfrequests : number = 1

    didYouMean : string = ''
    user: string = ''
    domain : string = ''
    formatValid: boolean = true
    mxFound : boolean = true
    smtpChecked : boolean = true
    catchAll : boolean = true
    role : boolean = true
    disposable : boolean = false
    free : boolean = true
    score : number = 1

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