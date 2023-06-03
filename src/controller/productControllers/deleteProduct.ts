import { RequestHandler } from "express";
import Product from "../../models/Product";
import IError from "../../schema/error/IError";
import IErrorType from "../../schema/error/IErrorType";
import IRequest from "../../schema/requests/IRequest";
import IDeleteResponse from "../../schema/response/IDeleteResponse";
import Status from "../../schema/response/Status";
import createError from "../../utils/createError";

const deleteProduct: RequestHandler = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
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

        await product.deleteOne();

        const response: IDeleteResponse = {
            status: Status.Success,
            message: "Product deleted",
        };

        res.status(200).json(response);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError(
                "Error in delete handler",
                IErrorType.ServerError,
                500
            );
            next(newError);
        } else {
            next(err);
        }
    }
};

export default deleteProduct;
