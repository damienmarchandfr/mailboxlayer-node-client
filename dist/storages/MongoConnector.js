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
exports.MongoConnector = void 0;
const AbstractConnector_1 = require("./AbstractConnector");
class MongoConnector extends AbstractConnector_1.AbstractConnector {
    constructor(collection) {
        super();
        this.collection = collection;
    }
    getEmailInfo(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailFromDb = yield this.collection.findOne({ email });
            if (emailFromDb !== null) {
                emailFromDb.alreadyInDatabase = true;
            }
            return emailFromDb;
        });
    }
    addEmailInfo(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.collection.updateOne({ email: email.email }, { $set: email }, { upsert: true });
            return email;
        });
    }
}
exports.MongoConnector = MongoConnector;
