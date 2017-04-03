"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var app_component_1 = require("../app.component");
var Module1 = (function () {
    function Module1() {
    }
    return Module1;
}());
Module1 = __decorate([
    core_1.NgModule({
        // directives, components, and pipes
        declarations: [
            app_component_1.AppComponent
        ],
        // modules
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule
        ],
        // providers1 2
        providers: [],
        bootstrap: [
            app_component_1.AppComponent
        ]
    })
], Module1);
exports.Module1 = Module1;
//# sourceMappingURL=module1.module.js.map