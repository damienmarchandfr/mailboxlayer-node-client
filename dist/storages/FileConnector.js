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
exports.FileConnector = void 0;
const AbstractConnector_1 = require("./AbstractConnector");
const fs = require("fs-extra");
class FileConnector extends AbstractConnector_1.AbstractConnector {
    constructor(path) {
        super();
        this.path = path;
    }
    addEmailInfo(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.creaeFolder();
            // Check if file exists
            try {
                yield fs.access(this.path + '/' + email.email);
            }
            catch (error) {
                // create file
                yield fs.writeFile(this.path + '/' + email.email, JSON.stringify(email));
            }
            return email;
        });
    }
    getEmailInfo(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.access(this.path + '/' + email);
            }
            catch (error) {
                return null;
            }
            // Read file
            const content = yield fs.readFile(this.path + '/' + email);
            const mail = JSON.parse(content.toString());
            mail.alreadyInDatabase = true;
            return mail;
        });
    }
    creaeFolder() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.access(this.path);
            }
            catch (error) {
                yield fs.mkdir(this.path);
            }
        });
    }
}
exports.FileConnector = FileConnector;
