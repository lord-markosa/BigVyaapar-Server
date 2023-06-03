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
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../../models/User"));
const constants_1 = require("../../constants");
const Status_1 = __importDefault(require("../../schema/response/Status"));
const IErrorType_1 = __importDefault(require("../../schema/error/IErrorType"));
const createError_1 = __importDefault(require("../../utils/createError"));
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw (0, createError_1.default)("Validation Failed", IErrorType_1.default.Validation, 422, errors.array());
        }
        const { phoneNumber, name, password, gstin } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        const user = new User_1.default({
            name,
            phoneNumber: phoneNumber.substr(phoneNumber.length - 10),
            password: hashedPassword,
            gstin,
        });
        yield user.save();
        const token = jsonwebtoken_1.default.sign({
            userId: user._id.toString(),
            userName: user.name,
            phoneNumber,
        }, constants_1.secretString, { expiresIn: "12h" });
        const response = {
            status: Status_1.default.Success,
            message: "User created successfully",
            token,
            user: { name, phoneNumber, userId: user._id.toString() },
        };
        res.status(201).json(response);
    }
    catch (err) {
        if (!err.statusCode) {
            const newError = (0, createError_1.default)("Error in signup handler", IErrorType_1.default.ServerError, 500);
            next(newError);
        }
        else {
            next(err);
        }
    }
});
exports.default = signUp;
