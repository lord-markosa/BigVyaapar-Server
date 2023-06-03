import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/User";
import IError from "../../schema/IError";
import { secretString } from "../../constants";
import IAuthResponse from "../../schema/IAuthResponse";
import Status from "../../schema/Status";
import IErrorType from "../../schema/IErrorType";
import createError from "../../utils/createError";

const signUp: RequestHandler = async (req, res, next) => {
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
        const { phoneNumber, name, password, gstin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            phoneNumber: phoneNumber.substr(phoneNumber.length - 10),
            password: hashedPassword,
            gstin,
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
            const newError = createError(
                "Error in signup handler",
                IErrorType.ServerError,
                500
            );
            next(newError);
        } else {
            next(err);
        }
    }
};

export default signUp;
