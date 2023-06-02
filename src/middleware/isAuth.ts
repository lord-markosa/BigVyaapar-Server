import { RequestHandler } from "express";
import IError from "../schema/error/IError";
import jwt, { JwtPayload } from "jsonwebtoken";
import IRequest, { CurrentUser } from "../schema/IRequest";
import { secretString } from "../constants";
import Status from "../schema/response/Status";
import IErrorType from "../schema/error/IErrorType";

const isAuth: RequestHandler = async (req, res, next) => {
    try {
        const token = req.get("Authorization");
        if (!token) {
            const error: IError = {
                ...new Error(),
                description: "Token not provided",
                status: Status.Failed,
                errorType: IErrorType.TokenMissed,
                statusCode: 401,
                data: null,
            };

            throw error;
        }
        const decodedToken = jwt.verify(token, secretString) as JwtPayload;
        if (!decodedToken) {
            const error: IError = {
                ...new Error(),
                description: "User not authorized for the action",
                status: Status.Failed,
                errorType: IErrorType.actionAuth,
                statusCode: 401,
                data: null,
            };

            throw error;
        }

        (req as IRequest).user = { ...(decodedToken as CurrentUser) };
        next();
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError: IError = {
                ...new Error(),
                description: "Error in auth handler",
                status: Status.Failed,
                errorType: IErrorType.ServerError,
                statusCode: 500,
                data: null,
            };
            console.log(newError);
            next(newError);
        } else {
            next(err);
        }
    }
};

export default isAuth;
