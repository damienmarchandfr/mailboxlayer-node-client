"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors = {
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
var MailBoxLayerError = /** @class */ (function (_super) {
    __extends(MailBoxLayerError, _super);
    function MailBoxLayerError(apiResponse) {
        var _this = _super.call(this, apiResponse.error.info) || this;
        _this.code = apiResponse.error.code;
        _this.message = errors[apiResponse.error.code];
        _this.apiResponseError = apiResponse;
        return _this;
    }
    return MailBoxLayerError;
}(Error));
exports.MailBoxLayerError = MailBoxLayerError;
//# sourceMappingURL=MailBoxLayer.error.js.map