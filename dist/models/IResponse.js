"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IResponseError = void 0;
class IResponseError {
    constructor(apiResponseError) {
        this.success = apiResponseError.success;
        this.error = apiResponseError.error;
    }
}
exports.IResponseError = IResponseError;
