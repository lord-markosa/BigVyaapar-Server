"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const Status_1 = __importDefault(require("../schema/response/Status"));
const IErrorType_1 = __importDefault(require("../schema/error/IErrorType"));
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.get("Authorization");
        if (!token) {
            const error = Object.assign(Object.assign({}, new Error()), { description: "Token not provided", status: Status_1.default.Failed, errorType: IErrorType_1.default.TokenMissed, statusCode: 401, data: null });
            throw error;
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, constants_1.secretString);
        if (!decodedToken) {
            const error = Object.assign(Object.assign({}, new Error()), { description: "User not authorized for the action", status: Status_1.default.Failed, errorType: IErrorType_1.default.actionAuth, statusCode: 401, data: null });
            throw error;
        }
        req.user = Object.assign({}, decodedToken);
        next();
    }
    catch (err) {
        if (!err.statusCode) {
            const newError = Object.assign(Object.assign({}, new Error()), { description: "Error in auth handler", status: Status_1.default.Failed, errorType: IErrorType_1.default.ServerError, statusCode: 500, data: null });
            console.log(newError);
            next(newError);
        }
        else {
            next(err);
        }
    }
});
exports.default = isAuth;
