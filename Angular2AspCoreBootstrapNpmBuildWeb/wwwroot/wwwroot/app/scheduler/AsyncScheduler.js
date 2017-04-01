"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FutureAction_1 = require("./FutureAction");
var QueueScheduler_1 = require("./QueueScheduler");
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsyncScheduler.prototype.scheduleNow = function (work, state) {
        return new FutureAction_1.FutureAction(this, work).schedule(state, 0);
    };
    return AsyncScheduler;
}(QueueScheduler_1.QueueScheduler));
exports.AsyncScheduler = AsyncScheduler;
