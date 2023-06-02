import { RequestHandler } from "express";
import Product from "../../models/Product";
import IError from "../../schema/error/IError";

const getProducts: RequestHandler = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            message: "Successfully fetched all products",
            products,
        });
    } catch (err) {
        if (!(err as IError).statusCode) {
            (err as IError).statusCode = 500;
        }
        next(err);
    }
};

export default getProducts;
