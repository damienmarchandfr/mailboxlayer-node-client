export interface IEmail {
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
}