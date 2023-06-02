import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Product from "../../models/Product";
import IError from "../../schema/error/IError";
import IProduct from "../../schema/IProduct";
import IRequest from "../../schema/IRequest";

const updateProduct: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error: IError = new Error("Validation Failed");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const productId = req.params.productId;
        let product = await Product.findById(productId);

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

        const updatedProduct: IProduct = req.body;

        product.description = updatedProduct.description;
        product.quantity = updatedProduct.quantity;
        product.price = updatedProduct.price;
        product.address = updatedProduct.address;
        product.category = updatedProduct.category;

        await product.save();
        res.status(201).json({
            message: "Product updated successfully",
            product,
        });
    } catch (err) {
        if (!(err as IError).statusCode) {
            (err as IError).statusCode = 500;
        }
        next(err);
    }
};

export default updateProduct;
