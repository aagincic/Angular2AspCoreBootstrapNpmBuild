"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../../Observable");
var combineLatest_1 = require("../../operator/combineLatest");
Observable_1.Observable.combineLatest = combineLatest_1.combineLatestStatic;
