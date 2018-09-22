export class IResponseError {
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
    user: string
    domain: string
    format_valid: boolean,
    mx_found: boolean,
    smtp_check: boolean,
    catch_all: boolean,
    role: boolean,
    disposable: boolean,
    free: boolean,
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

