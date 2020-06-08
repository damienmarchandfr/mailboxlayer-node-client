"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailBoxLayerError = void 0;
const errors = {
    404: '404 not found',
    101: 'missing access key or invalid access key',
    103: 'invalid api function',
    104: 'usage limit reached',
    210: 'no email address supplied',
    105: 'https access restricted',
    106: 'rate limit reached',
    102: 'inactive user',
    310: 'catch all access restricted',
    999: 'timeout'
};
class MailBoxLayerError extends Error {
    constructor(apiResponse) {
        super(apiResponse.error.info);
        this.code = apiResponse.error.code;
        this.message = errors[apiResponse.error.code];
        this.apiResponseError = apiResponse;
    }
}
exports.MailBoxLayerError = MailBoxLayerError;
