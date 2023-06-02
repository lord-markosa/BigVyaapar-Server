import { ErrorRequestHandler } from "express";
import IErrorResponse from "../schema/error/IErrorResponse";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    res.status(error.statusCode).json(error as IErrorResponse);
};
export default errorHandler;
