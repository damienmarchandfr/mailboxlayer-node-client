import { IApiResponseError } from '../IResponse';
export declare class MailBoxLayerError extends Error {
    apiResponseError: IApiResponseError;
    code: number;
    constructor(apiResponse: IApiResponseError);
}
