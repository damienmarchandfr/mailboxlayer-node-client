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
exports.MemoryConnector = void 0;
const AbstractConnector_1 = require("./AbstractConnector");
class MemoryConnector extends AbstractConnector_1.AbstractConnector {
    constructor() {
        super();
        console.info('Do not use memory connector in production');
        this.emails = [];
    }
    getEmailInfo(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.emails.filter(emailFromStorage => {
                return emailFromStorage.email === email;
            });
            if (result.length) {
                const info = result[0];
                info.alreadyInDatabase = true;
                return info;
            }
            return null;
        });
    }
    addEmailInfo(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield this.getEmailInfo(email.email);
            if (info === null) {
                this.emails.push(email);
            }
            return email;
        });
    }
}
exports.MemoryConnector = MemoryConnector;
