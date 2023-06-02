import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Product from "../../models/Product";
import IError from "../../schema/error/IError";
import IProduct from "../../schema/IProduct";
import IRequest from "../../schema/IRequest";

const createProduct: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error: IError = new Error("Validation Failed");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const productBody: IProduct = {
            ...req.body,
            userId: (req as IRequest).user.userId,
        };
        const product = new Product(productBody);

        await product.save();
        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (err) {
        if (!(err as IError).statusCode) {
            (err as IError).statusCode = 500;
        }
        next(err);
    }
};

export default createProduct;
