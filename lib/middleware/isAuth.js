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
const IErrorType_1 = __importDefault(require("../schema/IErrorType"));
const createError_1 = __importDefault(require("../utils/createError"));
const authError = (0, createError_1.default)("User not authorized for the action", IErrorType_1.default.Unauthorized, 401);
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.get("Authorization");
        if (!token) {
            throw (0, createError_1.default)("Token not provided", IErrorType_1.default.TokenMissed, 401);
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, constants_1.secretString);
        if (!decodedToken) {
            throw authError;
        }
        req.user = Object.assign({}, decodedToken);
        next();
    }
    catch (err) {
        if (!err.statusCode) {
            throw authError;
        }
        else {
            next(err);
        }
    }
});
exports.default = isAuth;
