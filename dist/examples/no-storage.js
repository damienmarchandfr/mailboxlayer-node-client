"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
// Without storage
var mailBoxLayer = new __1.MailBoxLayer({ accessKey: 'your_access_key', smtp: true, catchAll: true, secure: false });
mailBoxLayer.getInformations('zynefaty@duck2.club').then(function (email) {
    console.log(email);
})
    .catch(function (err) {
    console.error(err);
});
//# sourceMappingURL=no-storage.js.map