import { RequestHandler } from "express";
import IError from "../schema/IError";
import jwt, { JwtPayload } from "jsonwebtoken";
import IRequest, { CurrentUser } from "../schema/IRequest";
import { secretString } from "../constants";
import IErrorType from "../schema/IErrorType";
import createError from "../utils/createError";

const authError = createError(
    "User not authorized for the action",
    IErrorType.Unauthorized,
    401
);

const isAuth: RequestHandler = async (req, res, next) => {
    try {
        const token = req.get("Authorization");
        if (!token) {
            throw createError(
                "Token not provided",
                IErrorType.TokenMissed,
                401
            );
        }

        const decodedToken = jwt.verify(token, secretString) as JwtPayload;
        if (!decodedToken) {
            throw authError;
        }

        (req as IRequest).user = { ...(decodedToken as CurrentUser) };

        next();
    } catch (err) {
        if (!(err as IError).statusCode) {
            throw authError;
        } else {
            next(err);
        }
    }
};

export default isAuth;
