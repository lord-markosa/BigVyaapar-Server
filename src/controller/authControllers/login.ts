import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/User";
import IError from "../../schema/error/IError";
import { secretString } from "../../constants";
import IAuthResponse from "../../schema/response/auth/IAuthResponse";
import Status from "../../schema/response/Status";
import IErrorType from "../../schema/error/IErrorType";
import createError from "../../utils/createError";

const login: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError(
                "Validation Failed",
                IErrorType.Validation,
                422,
                errors.array()
            );
        }

        const { phoneNumber, password } = req.body;
        const user = await User.findOne({
            phoneNumber: phoneNumber.substr(phoneNumber.length - 10),
        });

        if (!user) {
            throw createError(
                "Phone Number not found",
                IErrorType.InvalidCred,
                401,
                [{ path: "phoneNumber" }]
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw createError("Invalid password", IErrorType.InvalidCred, 401, [
                { path: "password" },
            ]);
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
            const newError = createError(
                "Error in login handler",
                IErrorType.ServerError,
                500
            );
            next(newError);
        } else {
            next(err);
        }
    }
};

export default login;
