"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IResponseError = /** @class */ (function () {
    function IResponseError(apiResponseError) {
        this.success = apiResponseError.success;
        this.error = apiResponseError.error;
    }
    return IResponseError;
}());
exports.IResponseError = IResponseError;
//# sourceMappingURL=IResponse.js.map