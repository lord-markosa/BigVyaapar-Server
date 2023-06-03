import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Product from "../../models/Product";
import IError from "../../schema/error/IError";
import IErrorType from "../../schema/error/IErrorType";
import IProduct from "../../schema/IProduct";
import IRequest from "../../schema/requests/IRequest";
import IProductResponse from "../../schema/response/product/IProductResponse";
import Status from "../../schema/response/Status";
import createError from "../../utils/createError";

const updateProduct: RequestHandler = async (req, res, next) => {
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

        const productId = req.params.productId;
        let product = await Product.findById(productId);
        if (!product) {
            throw createError(
                "Product with this id doesn't exists",
                IErrorType.NotFound,
                404
            );
        }

        if (product.userId.toString() !== (req as IRequest).user.userId) {
            throw createError(
                "User not authorized for the action",
                IErrorType.Unauthorized,
                403
            );
        }

        const updatedProduct: IProduct = req.body;
        product.description = updatedProduct.description;
        product.price = updatedProduct.price;
        product.name = updatedProduct.name;

        await product.save();

        const response: IProductResponse = {
            status: Status.Success,
            message: " Product updated",
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
                "Error in update product handler",
                IErrorType.ServerError,
                500
            );
            next(newError);
        } else {
            next(err);
        }
    }
};

export default updateProduct;
