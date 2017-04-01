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
var Observable_1 = require("../Observable");
var Subscriber_1 = require("../Subscriber");
var Subscription_1 = require("../Subscription");
/**
 * @class ConnectableObservable<T>
 */
var ConnectableObservable = (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this.subject;
        if (subject && !subject.isUnsubscribed) {
            return subject;
        }
        return (this.subject = this.subjectFactory());
    };
    ConnectableObservable.prototype.connect = function () {
        var source = this.source;
        var subscription = this.subscription;
        if (subscription && !subscription.isUnsubscribed) {
            return subscription;
        }
        subscription = source.subscribe(this.getSubject());
        subscription.add(new ConnectableSubscription(this));
        return (this.subscription = subscription);
    };
    ConnectableObservable.prototype.refCount = function () {
        return new RefCountObservable(this);
    };
    /**
     * This method is opened for `ConnectableSubscription`.
     * Not to call from others.
     */
    ConnectableObservable.prototype._closeSubscription = function () {
        this.subject = null;
        this.subscription = null;
    };
    return ConnectableObservable;
}(Observable_1.Observable));
exports.ConnectableObservable = ConnectableObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ConnectableSubscription = (function (_super) {
    __extends(ConnectableSubscription, _super);
    function ConnectableSubscription(connectable) {
        var _this = _super.call(this) || this;
        _this.connectable = connectable;
        return _this;
    }
    ConnectableSubscription.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        connectable._closeSubscription();
        this.connectable = null;
    };
    return ConnectableSubscription;
}(Subscription_1.Subscription));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RefCountObservable = (function (_super) {
    __extends(RefCountObservable, _super);
    function RefCountObservable(connectable, refCount) {
        if (refCount === void 0) { refCount = 0; }
        var _this = _super.call(this) || this;
        _this.connectable = connectable;
        _this.refCount = refCount;
        return _this;
    }
    RefCountObservable.prototype._subscribe = function (subscriber) {
        var connectable = this.connectable;
        var refCountSubscriber = new RefCountSubscriber(subscriber, this);
        var subscription = connectable.subscribe(refCountSubscriber);
        if (!subscription.isUnsubscribed && ++this.refCount === 1) {
            refCountSubscriber.connection = this.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountObservable;
}(Observable_1.Observable));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var RefCountSubscriber = (function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, refCountObservable) {
        var _this = _super.call(this, null) || this;
        _this.destination = destination;
        _this.refCountObservable = refCountObservable;
        _this.connection = refCountObservable.connection;
        destination.add(_this);
        return _this;
    }
    RefCountSubscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    RefCountSubscriber.prototype._error = function (err) {
        this._resetConnectable();
        this.destination.error(err);
    };
    RefCountSubscriber.prototype._complete = function () {
        this._resetConnectable();
        this.destination.complete();
    };
    RefCountSubscriber.prototype._resetConnectable = function () {
        var observable = this.refCountObservable;
        var obsConnection = observable.connection;
        var subConnection = this.connection;
        if (subConnection && subConnection === obsConnection) {
            observable.refCount = 0;
            obsConnection.unsubscribe();
            observable.connection = null;
            this.unsubscribe();
        }
    };
    RefCountSubscriber.prototype._unsubscribe = function () {
        var observable = this.refCountObservable;
        if (observable.refCount === 0) {
            return;
        }
        if (--observable.refCount === 0) {
            var obsConnection = observable.connection;
            var subConnection = this.connection;
            if (subConnection && subConnection === obsConnection) {
                obsConnection.unsubscribe();
                observable.connection = null;
            }
        }
    };
    return RefCountSubscriber;
}(Subscriber_1.Subscriber));
