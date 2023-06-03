"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    res.status(error.statusCode).json(error);
};
exports.default = errorHandler;
