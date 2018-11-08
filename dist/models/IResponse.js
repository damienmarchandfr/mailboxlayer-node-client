"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IResponseError {
    constructor(apiResponseError) {
        this.success = apiResponseError.success;
        this.error = apiResponseError.error;
    }
}
exports.IResponseError = IResponseError;
