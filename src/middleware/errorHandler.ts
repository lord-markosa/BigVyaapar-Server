import { ErrorRequestHandler } from "express";
import IErrorResponse from "../schema/IErrorResponse";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    res.status(error.statusCode).json(error as IErrorResponse);
};
export default errorHandler;
