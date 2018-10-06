"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var rp = require("request-promise");
var sinon = require("sinon");
var __1 = require("../..");
var MemoryConnector_1 = require("../../storages/MemoryConnector");
var apiResponse = {
    email: 'support@apilayer.com',
    did_you_mean: '',
    user: 'support',
    domain: 'apilayer.net',
    format_valid: true,
    mx_found: true,
    smtp_check: true,
    catch_all: false,
    role: true,
    disposable: false,
    free: false,
    score: 0.8
};
var apiResponseError = {
    success: false,
    error: {
        code: 210,
        type: 'no_email_address_supplied',
        info: 'Please specify an email address. [Example: support@apilayer.com]'
    }
};
var mailBoxLayer;
var mailBoxLayerWithCache;
var stub;
var memoryConnector = new MemoryConnector_1.MemoryConnector();
describe('Test MailBoxLayer class', function () {
    before(function () {
        stub = sinon.stub(rp, 'get').resolves(apiResponse);
        mailBoxLayer = new __1.MailBoxLayer({
            accessKey: 'fdfjskl',
            cache: false,
            catchAll: false,
            secure: false,
            smtp: false
        });
        mailBoxLayerWithCache = new __1.MailBoxLayer({
            accessKey: 'fdfjskl',
            cache: true,
            catchAll: false,
            secure: false,
            smtp: false,
            connector: memoryConnector
        });
    });
    afterEach(function () {
        memoryConnector.emails = [];
        stub.restore();
        stub = sinon.stub(rp, 'get').resolves(apiResponse);
    });
    it('should return mail info like api response in camel case', function () { return __awaiter(_this, void 0, void 0, function () {
        var info, emailInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mailBoxLayer.getInformations('damien@marchand.fr')];
                case 1:
                    info = _a.sent();
                    emailInfo = {
                        email: 'support@apilayer.com',
                        didYouMean: '',
                        user: 'support',
                        domain: 'apilayer.net',
                        formatValid: true,
                        mxFound: true,
                        catchAll: false,
                        role: true,
                        disposable: false,
                        free: false,
                        score: 0.8,
                        smtpChecked: true,
                        alreadyInDatabase: false
                    };
                    chai_1.expect(JSON.parse(JSON.stringify(info))).to.eql(emailInfo);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return result for transaction check and marketing', function () { return __awaiter(_this, void 0, void 0, function () {
        var info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mailBoxLayer.getInformations('damien@marchand.fr')];
                case 1:
                    info = _a.sent();
                    chai_1.expect(info.canbeUsedForMarketing()).to.be.true;
                    chai_1.expect(info.canbeUsedForMarketing()).to.be.true;
                    info.score = 0.3;
                    chai_1.expect(info.canbeUsedForMarketing()).to.be.false;
                    chai_1.expect(info.canbeUsedForMarketing()).to.be.false;
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw error if API error', function () { return __awaiter(_this, void 0, void 0, function () {
        var error, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stub.restore();
                    sinon.stub(rp, 'get').resolves(apiResponseError);
                    error = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mailBoxLayer.getInformations('damien@marchand.fr')];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    error = err_1;
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(error.code).to.eql(apiResponseError.error.code);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return already in database === true if saved in database', function () { return __awaiter(_this, void 0, void 0, function () {
        var info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mailBoxLayerWithCache.getInformations('support@apilayer.com')];
                case 1:
                    info = _a.sent();
                    chai_1.expect(info.alreadyInDatabase).to.be.false;
                    return [4 /*yield*/, mailBoxLayerWithCache.getInformations('support@apilayer.com')];
                case 2:
                    info = _a.sent();
                    chai_1.expect(info.alreadyInDatabase).to.be.true;
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.test.js.map