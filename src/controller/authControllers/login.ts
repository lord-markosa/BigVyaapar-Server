import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/User";
import IError from "../../schema/error/IError";
import { secretString } from "../../constants";
import IAuthResponse from "../../schema/response/IAuthResponse";
import Status from "../../schema/response/Status";
import IErrorType from "../../schema/error/IErrorType";

const login: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error: IError = {
                ...new Error(),
                description: "Validation Failed",
                status: Status.Failed,
                errorType: IErrorType.Validation,
                statusCode: 422,
                data: errors.array(),
            };

            throw error;
        }

        const { phoneNumber, password } = req.body;
        const user = await User.findOne({
            phoneNumber: phoneNumber.substr(phoneNumber.length - 10),
        });

        if (!user) {
            const error: IError = {
                ...new Error(),
                description: "Phone Number not found",
                status: Status.Failed,
                errorType: IErrorType.InvalidCred,
                statusCode: 401,
                data: [{ path: "phoneNumber" }],
            };

            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error: IError = {
                ...new Error(),
                description: "Invalid password",
                status: Status.Failed,
                errorType: IErrorType.InvalidCred,
                statusCode: 401,
                data: [{ path: "password" }],
            };

            throw error;
        }

        const token = jwt.sign(
            {
                userId: user._id.toString(),
                userName: user.name,
                phoneNumber,
            },
            secretString,
            { expiresIn: "12h" }
        );

        const response: IAuthResponse = {
            status: Status.Success,
            message: "Logged in successfully",
            token,
            user: { name: user.name, phoneNumber, userId: user._id.toString() },
        };

        res.status(200).json(response);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError: IError = {
                ...new Error(),
                description: "Error in login in handler",
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

export default login;
