import { IApiResponse } from '../IResponse';

export class Email {
    public email: string

    public didYouMean: string = ''
    public user: string = ''
    public domain: string = ''
    public formatValid: boolean = true
    public mxFound: boolean = true
    public smtpChecked: boolean = true
    public catchAll: boolean = true
    public role: boolean = true
    public disposable: boolean = false
    public free: boolean = true
    public score: number = 1

    public alreadyInDatabase: boolean

    constructor(email: string) {
        this.email = email
        this.alreadyInDatabase = false
    }

    public fromAPIResponse(apiResponse: IApiResponse) {
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

    public canBeUseForTransactions(): boolean {
        return this.score >= 0.65
    }

    public canbeUsedForMarketing(): boolean {
        return this.score >= 0.8
    }
}
