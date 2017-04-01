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
var Subject_1 = require("./Subject");
/**
 * @class AsyncSubject<T>
 */
var AsyncSubject = (function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = null;
        _this.hasNext = false;
        return _this;
    }
    AsyncSubject.prototype._subscribe = function (subscriber) {
        if (this.hasCompleted && this.hasNext) {
            subscriber.next(this.value);
        }
        return _super.prototype._subscribe.call(this, subscriber);
    };
    AsyncSubject.prototype._next = function (value) {
        this.value = value;
        this.hasNext = true;
    };
    AsyncSubject.prototype._complete = function () {
        var index = -1;
        var observers = this.observers;
        var len = observers.length;
        // optimization to block our SubjectSubscriptions from
        // splicing themselves out of the observers list one by one.
        this.isUnsubscribed = true;
        if (this.hasNext) {
            while (++index < len) {
                var o = observers[index];
                o.next(this.value);
                o.complete();
            }
        }
        else {
            while (++index < len) {
                observers[index].complete();
            }
        }
        this.isUnsubscribed = false;
        this.unsubscribe();
    };
    return AsyncSubject;
}(Subject_1.Subject));
exports.AsyncSubject = AsyncSubject;
