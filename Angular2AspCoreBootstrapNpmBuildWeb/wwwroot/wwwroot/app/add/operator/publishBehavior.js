"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../../Observable");
var publishBehavior_1 = require("../../operator/publishBehavior");
Observable_1.Observable.prototype.publishBehavior = publishBehavior_1.publishBehavior;
