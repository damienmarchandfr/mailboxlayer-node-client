"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    constructor(email) {
        this.didYouMean = '';
        this.user = '';
        this.domain = '';
        this.formatValid = true;
        this.mxFound = true;
        this.smtpChecked = true;
        this.catchAll = true;
        this.role = true;
        this.disposable = false;
        this.free = true;
        this.score = 1;
        this.email = email;
        this.alreadyInDatabase = false;
    }
    fromAPIResponse(apiResponse) {
        this.email = apiResponse.email;
        this.didYouMean = apiResponse.did_you_mean || '';
        this.user = apiResponse.user || '';
        this.domain = apiResponse.domain || '';
        this.formatValid = apiResponse.format_valid;
        this.mxFound = apiResponse.mx_found;
        this.smtpChecked = apiResponse.smtp_check;
        this.catchAll = apiResponse.catch_all;
        this.role = apiResponse.role;
        this.disposable = apiResponse.disposable;
        this.free = apiResponse.free;
        this.score = apiResponse.score;
    }
    canBeUseForTransactions() {
        return this.score >= 0.65;
    }
    canbeUsedForMarketing() {
        return this.score >= 0.8;
    }
}
exports.Email = Email;
