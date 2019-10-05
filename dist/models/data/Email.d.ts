import { IApiResponse } from '../IResponse';
export declare class Email {
    email: string;
    didYouMean: string;
    user: string;
    domain: string;
    formatValid: boolean;
    mxFound: boolean;
    smtpChecked: boolean;
    catchAll: boolean;
    role: boolean;
    disposable: boolean;
    free: boolean;
    score: number;
    alreadyInDatabase: boolean;
    constructor(email: string);
    fromAPIResponse(apiResponse: IApiResponse): void;
    canBeUseForTransactions(): boolean;
    canbeUsedForMarketing(): boolean;
}
