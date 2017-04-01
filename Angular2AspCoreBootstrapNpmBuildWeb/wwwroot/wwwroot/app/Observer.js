"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = {
    isUnsubscribed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
