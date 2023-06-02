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

const signUp: RequestHandler = async (req, res, next) => {
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
        const { phoneNumber, name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            phoneNumber: phoneNumber.substr(phoneNumber.length - 10),
            password: hashedPassword,
        });

        await user.save();

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
            message: "User created successfully",
            token,
            user: { name, phoneNumber, userId: user._id.toString() },
        };

        res.status(201).json(response);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError: IError = {
                ...new Error(),
                description: "Error in sign up handler",
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

export default signUp;
