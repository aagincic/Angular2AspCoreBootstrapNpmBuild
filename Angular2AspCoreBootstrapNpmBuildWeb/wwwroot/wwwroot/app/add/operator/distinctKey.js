"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../../Observable");
var distinctKey_1 = require("../../operator/distinctKey");
Observable_1.Observable.prototype.distinctKey = distinctKey_1.distinctKey;
