"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IErrorType;
(function (IErrorType) {
    IErrorType["Validation"] = "validation";
    IErrorType["ServerError"] = "server error";
    IErrorType["InvalidCred"] = "invalid credential";
    IErrorType["TokenMissed"] = "missing token";
    IErrorType["actionAuth"] = "action is not authorized";
})(IErrorType || (IErrorType = {}));
exports.default = IErrorType;
