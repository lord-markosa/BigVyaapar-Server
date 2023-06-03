"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Status_1 = __importDefault(require("../schema/Status"));
function createError(description, errorType, statusCode, data) {
    const error = Object.assign(Object.assign({}, new Error()), { description, status: Status_1.default.Failed, errorType,
        statusCode,
        data });
    return error;
}
exports.default = createError;
