"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IErrorType;
(function (IErrorType) {
    IErrorType["Validation"] = "validation";
    IErrorType["ServerError"] = "server error";
    IErrorType["InvalidCred"] = "invalid credential";
    IErrorType["TokenMissed"] = "missing token";
    IErrorType["Unauthorized"] = "action is not authorized";
    IErrorType["NotFound"] = "object not found";
})(IErrorType || (IErrorType = {}));
exports.default = IErrorType;
