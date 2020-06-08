"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailBoxLayer = void 0;
const rp = require("request-promise");
const MailBoxLayer_error_1 = require("./models/errors/MailBoxLayer.error");
const Email_1 = require("./models/data/Email");
class MailBoxLayer {
    constructor(config) {
        if (config.cache && !config.connector) {
            throw new Error('If cache is true you muste provide a connector');
        }
        this.config = config;
    }
    getInformations(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                uri: this.generateApiUrl(email),
                json: true
            };
            if (this.config.cache && this.config.connector) {
                const emailFromDb = yield this.config.connector.getEmailInfo(email);
                if (emailFromDb !== null) {
                    return emailFromDb;
                }
            }
            // If not in database or no storage given make an API request
            const apiResponse = yield rp.get(options);
            if (apiResponse.hasOwnProperty('success')) {
                throw new MailBoxLayer_error_1.MailBoxLayerError(apiResponse);
            }
            const emailFromApi = new Email_1.Email(email);
            emailFromApi.fromAPIResponse(apiResponse);
            // Save in database
            if (this.config.cache && this.config.connector) {
                yield this.config.connector.addEmailInfo(emailFromApi);
            }
            return emailFromApi;
        });
    }
    generateApiUrl(email) {
        const protocol = this.config.secure ? 'https://' : 'http://';
        return protocol + 'apilayer.net/api/check?access_key=' +
            this.config.accessKey + '&email=' + email + '&smtp=' + (this.config.smtp ? 1 : 0);
    }
}
exports.MailBoxLayer = MailBoxLayer;
