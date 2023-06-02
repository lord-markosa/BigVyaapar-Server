import { RequestHandler } from "express";
import Product from "../../models/Product";
import IError from "../../schema/error/IError";
import IRequest from "../../schema/IRequest";

const deleteProduct: RequestHandler = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            const error: IError = new Error("Cannot find product");
            error.statusCode = 404;
            throw error;
        }
        if (product.userId.toString() !== (req as IRequest).user.userId) {
            const error: IError = new Error("Not authorized");
            error.statusCode = 403;
            throw error;
        }
        await product.deleteOne();
        res.status(200).json({
            message: "Successfully deleted product",
        });
    } catch (err) {
        if (!(err as IError).statusCode) {
            (err as IError).statusCode = 500;
        }
        next(err);
    }
};

export default deleteProduct;
