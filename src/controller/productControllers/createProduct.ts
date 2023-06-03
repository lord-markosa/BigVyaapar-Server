import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Product from "../../models/Product";
import IError from "../../schema/IError";
import IErrorType from "../../schema/IErrorType";
import IProduct from "../../schema/IProduct";
import IRequest from "../../schema/IRequest";
import IProductResponse from "../../schema/IProductResponse";
import Status from "../../schema/Status";
import createError from "../../utils/createError";

const createProduct: RequestHandler = async (req, res, next) => {
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

        const productBody: IProduct = {
            ...req.body,
            trades: [],
            userId: (req as IRequest).user.userId,
        };

        const product = new Product(productBody);
        await product.save();

        const response: IProductResponse = {
            status: Status.Success,
            message: " Product created",
            product: {
                productId: product._id.toString(),
                name: product.name,
                description: product.description,
                price: product.price,
            },
        };

        res.status(201).json(response);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError(
                "Error in create product handler",
                IErrorType.ServerError,
                500
            );
            next(newError);
        } else {
            next(err);
        }
    }
};

export default createProduct;
