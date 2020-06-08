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
exports.RedisConnector = void 0;
const AbstractConnector_1 = require("./AbstractConnector");
class RedisConnector extends AbstractConnector_1.AbstractConnector {
    constructor(redisClient) {
        super();
        this.redisClient = redisClient;
    }
    addEmailInfo(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const num = yield this.redisClient.existsAsync(email.email);
            if (num === 0) {
                yield this.redisClient.setAsync(email.email, JSON.stringify(email));
            }
            return email;
        });
    }
    getEmailInfo(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const emails = yield this.redisClient.mgetAsync(email);
            if (emails.length && emails[0] !== null) {
                const mail = JSON.parse(emails[0]);
                mail.alreadyInDatabase = true;
                return mail;
            }
            return null;
        });
    }
}
exports.RedisConnector = RedisConnector;
