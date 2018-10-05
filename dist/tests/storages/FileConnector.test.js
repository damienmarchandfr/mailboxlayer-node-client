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
var FileConnector_1 = require("../../storages/FileConnector");
var fs = require("fs-extra");
var rimraf = require("rimraf");
var emailToTest = 'damien@marchand.fr';
var fileConnector;
var emailResponse = {
    email: emailToTest,
    catchAll: true,
    didYouMean: 'damien@damien.fr',
    disposable: false,
    domain: 'marchand.fr',
    formatValid: true,
    free: true,
    mxFound: true,
    role: true,
    score: 1,
    smtpChecked: true,
    user: 'damien'
};
var counter = 0;
describe('Test File connector : ', function () {
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fileConnector = new FileConnector_1.FileConnector('./temp');
            return [2 /*return*/];
        });
    }); });
    after(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        rimraf('./temp', function (err) {
                            resolve();
                        });
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var errorDelete, error_1, errorAccess, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorDelete = new Error();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            rimraf('./temp', function (err) {
                                if (err) {
                                    reject(err);
                                }
                                resolve();
                            });
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    errorDelete = error_1;
                    return [3 /*break*/, 4];
                case 4:
                    if (counter === 0) {
                        chai_1.expect(errorDelete.message).not.to.be.undefined;
                    }
                    else {
                        chai_1.expect(errorDelete.message).to.be.empty;
                    }
                    errorAccess = new Error();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, fs.access('./temp')];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    errorAccess = error_2;
                    return [3 /*break*/, 8];
                case 8:
                    chai_1.expect(errorAccess.message).not.to.be.undefined;
                    counter++;
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create the folder and file', function () { return __awaiter(_this, void 0, void 0, function () {
        var errorNotExists, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fileConnector.addEmailInfo(emailResponse)];
                case 1:
                    _a.sent();
                    errorNotExists = new Error();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, fs.access('./temp/' + emailResponse.email)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    errorNotExists = error_3;
                    return [3 /*break*/, 5];
                case 5:
                    chai_1.expect(errorNotExists.message).to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return null if email not saved in database', function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fileConnector.getEmailInfo(emailToTest)];
                case 1:
                    result = _a.sent();
                    chai_1.expect(result).to.be.null;
                    return [2 /*return*/];
            }
        });
    }); });
    it('should add an email if not exists in database', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, email, _i, _a, key;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fileConnector.getEmailInfo(emailToTest)];
                case 1:
                    result = _b.sent();
                    chai_1.expect(result).to.be.null;
                    email = {
                        email: emailToTest,
                        catchAll: true,
                        didYouMean: 'damien@damien.fr',
                        disposable: false,
                        domain: 'marchand.fr',
                        formatValid: true,
                        free: true,
                        mxFound: true,
                        role: true,
                        score: 1,
                        smtpChecked: true,
                        user: 'damien'
                    };
                    return [4 /*yield*/, fileConnector.addEmailInfo(email)
                        // File exists
                    ];
                case 2:
                    _b.sent();
                    // File exists
                    return [4 /*yield*/, fs.access('./temp/' + email.email)];
                case 3:
                    // File exists
                    _b.sent();
                    return [4 /*yield*/, fileConnector.getEmailInfo(emailToTest)];
                case 4:
                    result = _b.sent();
                    for (_i = 0, _a = Object.keys(email); _i < _a.length; _i++) {
                        key = _a[_i];
                        chai_1.expect(result[key]).to.eql(email[key]);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('should creae 2 files. One for each email', function () { return __awaiter(_this, void 0, void 0, function () {
        var email, files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = {
                        email: emailToTest,
                        catchAll: true,
                        didYouMean: 'damien@damien.fr',
                        disposable: false,
                        domain: 'marchand.fr',
                        formatValid: true,
                        free: true,
                        mxFound: true,
                        role: true,
                        score: 1,
                        smtpChecked: true,
                        user: 'damien'
                    };
                    return [4 /*yield*/, fileConnector.addEmailInfo(email)];
                case 1:
                    _a.sent();
                    email.email = 'damien@github.fr';
                    return [4 /*yield*/, fileConnector.addEmailInfo(email)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fs.readdir('./temp')];
                case 3:
                    files = _a.sent();
                    chai_1.expect(files.length).to.eql(2);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=FileConnector.test.js.map